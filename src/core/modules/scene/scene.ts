import { Subscription } from 'rxjs';

import { Scene as BabylonJsScene } from '@babylonjs/core/scene';

// Inspector (only dev mode), these comments will be replaced from webpack.dev.js
/* babylonjs-debugLayer */
/* babylonjs-inspector */

import { Actor } from '../actor/actor';
import { ActionsManager } from '../actions/actions-manager';
import { CoreSubscriptions } from '../../models/core-subscriptions';
import { DimensionsWH } from '../../models/dimensions-wh';
import { Engine } from '../engine/engine';
import { Mesh } from '../mesh/mesh';
import { Sprite } from '../sprite/sprite';
import { SpriteInstance } from '../sprite/sprite-instance';
import { SpriteProperties } from '../sprite/sprite-properties';
import { SceneStart } from './scene-start';
import { DisplayObject } from '../../models/display-object';
import { Logger } from '../logger/logger';
import { Misc } from '../misc/misc';

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
    private readonly spriteInstances: Misc.KeyValue<string, SpriteInstance> = new Misc.KeyValue<string, SpriteInstance>();

    // Actors
    private readonly meshes: Mesh[] = [];
    private readonly sprites: Sprite[] = [];

    // Actors
    private readonly actors: Actor[] = [];

    // Actions
    protected readonly actions: ActionsManager<any> = new ActionsManager<any>();

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

        // Create display objects for any actor added to the scene
        this.actors.forEach((actor) => {
            const displayObject: DisplayObject = actor.getDisplayObject(this.babylonjs);
            if (displayObject instanceof Sprite) {
                this.sprites.push(displayObject);
            } else if (displayObject instanceof Mesh) {
                this.meshes.push(displayObject);
            } else {
                Logger.error('Unknown DisplayObject instance -', actor.name);
            }
        });

        // Assign sprite instances to sprites
        this.sprites.forEach((sprite) => {
            sprite.assignInstance(this.getSpriteInstance(sprite.properties));
        });

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
     * Since assets are loaded by scene, the sprite assets are stored here.
     * TODO: Maybe switching to an external manager in the future.
     *
     * @param url Returns existing instance of SpriteManager or create a new one
     * @param properties
     * @returns
     */
    private getSpriteInstance(properties: SpriteProperties): SpriteInstance {
        // Search and return existing instance
        let spriteInstance: SpriteInstance = this.spriteInstances.get(properties.url);
        if (spriteInstance) {
            return spriteInstance;
        }

        // Create and return a new instance if not found
        spriteInstance = new SpriteInstance(properties, this.babylonjs);
        this.spriteInstances.add(properties.url, spriteInstance);
        return spriteInstance;
    }

    // ------------------------
    //   Actor methods
    // ------------------------

    addActor(actor: Actor): any {
        this.actors.push(actor);
        return actor;
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
