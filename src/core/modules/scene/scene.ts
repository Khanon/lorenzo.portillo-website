import { Scene as BabylonJsScene } from '@babylonjs/core/scene';
import { SpriteManager } from '@babylonjs/core/Sprites/spriteManager';
import { Mesh as BabylonJsMesh } from '@babylonjs/core/Meshes/mesh';
import { Observable, Subscription } from 'rxjs';

// Inspector (only dev mode), these comments will be replaced from webpack.dev.js
/* babylonjs-debugLayer */
/* babylonjs-inspector */

import { Actor, Engine, Mesh, Sprite, SpriteInstance, SpriteProperties } from '..';
import { CoreSubscriptions, DimensionsWH } from '../../models';
import { SceneStart } from './scene-start';

export abstract class Scene {
    babylonjs: BabylonJsScene;

    protected engine: Engine;
    protected canvas: HTMLCanvasElement;
    protected coreSubscriptions: CoreSubscriptions;
    protected isDevelopmentMode: boolean;
    protected isExecuted: boolean = false;

    // Subscriptions
    private subscriptions: Subscription[] = [];

    // Sprites
    private readonly MAX_SPRITES_PER_INSTANCE = 255;
    private readonly spriteInstances: SpriteInstance[] = [];

    // Actors
    private readonly actors: Actor[] = [];

    /**
     * Create babylonjs scene, trigger onLoad.
     * @param properties
     */
    start(properties: SceneStart): void {
        this.engine = properties.engine;
        this.canvas = properties.canvas;
        this.coreSubscriptions = properties.coreSubscriptions;
        this.isDevelopmentMode = properties.isDevelopmentMode;

        this.babylonjs = new BabylonJsScene(this.engine.babylonjs);

        this.onLoad();
        this.babylonjs.executeWhenReady(() => {
            // Once the scene is loaded, register a render loop // 8a8f possible renderLoops leaks after loading different scenes
            this.engine.babylonjs.runRenderLoop(() => {
                this.isExecuted = true;
                this.babylonjs.render();
                if (properties.fpsContainer) {
                    let divFps = document.getElementById(properties.fpsContainer);
                    divFps.innerHTML = this.engine.babylonjs.getFps().toFixed() + ' fps';
                }
            });

            // Initialize actors
            this.actors.forEach((actor) => actor.initialize());

            // Call child onLoaded
            this.onLoaded(properties.canvasDimensions);
        });

        // Babylonjs inspector (only DEV mode). Babylonjs inspector imports are removed on webpack build
        if (properties.isDevelopmentMode) {
            this.debugInspector();
        }
    }

    // ------------------------
    //   Load and Release
    // ------------------------

    abstract onLoad(): void;
    abstract onLoaded(canvasSize: DimensionsWH): void;

    // abstract onRelease(): void;
    // abstract onReleased(): void;

    // ------------------------
    //   Subscriptions
    // ------------------------

    getLoopUpdate(): Observable<number> {
        return this.coreSubscriptions.loopUpdate;
    }

    protected addSubscription(subscription: Subscription): void {
        this.subscriptions.push(subscription);
    }

    protected releaseSubscriptions(): void {
        // 8a8f When should this function be called? After scene switch?
        // Do state.Delete() for all registered states on actors and scene
        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
        this.subscriptions = [];
    }

    // ------------------------
    //   Sprite methods
    // ------------------------

    /**
     * Create a new Sprite using the corresponding instance.
     * If assigned to an actor, needs to be created from actor 'addToScene' method.
     * @param url
     * @param cellSize
     * @returns
     */
    addSprite(name: string, url: string, properties: SpriteProperties): Sprite {
        return new Sprite(name, this.getSpriteInstance(url, properties), properties);
    }

    /**
     *
     * @param url Returns existing instance of SpriteManager or create a new one
     * @param properties
     * @returns
     */
    private getSpriteInstance(url: string, properties: SpriteProperties): SpriteInstance {
        // Search and return existing instance
        this.spriteInstances.forEach((spriteInstance) => {
            if (spriteInstance.url === url) {
                return spriteInstance.babylonjs;
            }
        });

        // Create and return a new instance if not found
        const spriteInstance = {
            url,
            babylonjs: new SpriteManager(
                url,
                url,
                this.MAX_SPRITES_PER_INSTANCE,
                ({ width: properties.width, height: properties.height } = properties),
                this.babylonjs
            ),
        };
        this.spriteInstances.push(spriteInstance);
        return spriteInstance;
    }

    // ------------------------
    //   Mesh methods
    // ------------------------

    /**
     * Create a mesh.
     * If assigned to an actor, needs to be created from application actor 'addToScene' method.
     * @param createFunction
     * @returns
     */
    addMesh(createFunction: () => BabylonJsMesh): Mesh {
        return new Mesh(createFunction());
    }

    // ------------------------
    //   Actor methods
    // ------------------------

    /**
     * Actors are added to the scene automatically from 'Actor' constructor
     * @param actor
     */
    addActor(actor: Actor): void {
        this.actors.push(actor);
    }

    // ------------------------
    //   Debug methods
    // ------------------------

    private debugInspector(): void {
        window.addEventListener('keydown', (ev) => {
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === 'I') {
                // @ts-ignore
                if (this.babylonjs.debugLayer.isVisible()) {
                    // @ts-ignore
                    this.babylonjs.debugLayer.hide();
                } else {
                    // @ts-ignore
                    this.babylonjs.debugLayer.show();
                }
            }
        });
    }
}
