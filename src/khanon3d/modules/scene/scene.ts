import { Scene as BabylonJsScene } from '@babylonjs/core/scene';

// Inspector (only dev mode), these comments will be replaced from webpack.dev.js
/* babylonjs-debugLayer */
/* babylonjs-inspector */

import { ActionsManager } from '../actions/actions-manager';
import { CoreSubscriptions } from '../../models/core-subscriptions';
import { DimensionsWH } from '../../models/dimensions-wh';
import { Engine } from '../engine/engine';
import { Mesh } from '../mesh/mesh';
import { Sprite } from '../sprite/sprite';
import { SceneProperties } from './scene-start';
import { DisplayObject } from '../../models/display-object';
import { Logger } from '../logger/logger';
import { ParticlesFactory } from '../particle/particles-factory';
import { Subscriber } from '../../models/subscriber';
import { SpritesManager } from '../sprite/sprites-manager';
import { MeshesManager } from '../mesh/meshes-manager';
import { ActorsManager } from '../actor/actors-manager';

export abstract class Scene extends Subscriber {
    babylonjs: BabylonJsScene;

    protected engine: Engine;
    protected canvas: HTMLCanvasElement;
    protected coreSubscriptions: CoreSubscriptions;
    protected isDevelopmentMode: boolean;
    protected isExecuted: boolean = false;

    // Managers
    protected spritesManager: SpritesManager;
    protected meshesManager: MeshesManager;
    protected actorsManager: ActorsManager;

    // Actions
    protected readonly actions: ActionsManager<any> = new ActionsManager<any>();

    // Particles
    protected particles: ParticlesFactory;

    /**
     * Create babylonjs scene, trigger onLoad.
     * @param properties
     */
    load(properties: SceneProperties): void {
        this.release();
        this.engine = properties.engine;
        this.canvas = properties.canvas;
        this.coreSubscriptions = properties.coreSubscriptions;
        this.isDevelopmentMode = properties.isDevelopmentMode;
        this.isExecuted = false;

        this.babylonjs = new BabylonJsScene(this.engine.babylonjs);
        this.spritesManager = new SpritesManager(this.babylonjs);
        this.meshesManager = new MeshesManager();
        this.actorsManager = new ActorsManager();
        this.particles = new ParticlesFactory(this.babylonjs, this.spritesManager, this.meshesManager);

        this.onLoad();

        // Create display objects for any actor added to the scene
        this.actorsManager.actors.forEach((actor) => {
            const displayObject: DisplayObject = actor.getDisplayObject(this.babylonjs);
            if (displayObject instanceof Sprite) {
                this.spritesManager.addSprite(displayObject);
            } else if (displayObject instanceof Mesh) {
                this.meshesManager.addMesh(displayObject);
            } else {
                Logger.error('Unknown DisplayObject instance on actor -', actor.name);
            }
            actor.createParticlesManager(this.babylonjs, this.spritesManager, this.meshesManager);
        });

        this.babylonjs.executeWhenReady(() => {
            // Once the scene is loaded, register a render loop // TODO: possible renderLoops leaks after loading different scenes
            this.engine.babylonjs.runRenderLoop(() => {
                this.isExecuted = true;
                this.babylonjs.render();
                if (properties.fpsContainer) {
                    let divFps = document.getElementById(properties.fpsContainer);
                    divFps.innerHTML = this.engine.babylonjs.getFps().toFixed() + ' fps';
                }
            });

            // Initialize actors
            this.actorsManager.actors.forEach((actor) => actor.initialize());

            // Call child onLoaded
            this.onLoaded(properties.canvasDimensions);
        });

        // Babylonjs inspector (only DEV mode). Babylonjs inspector imports are removed on webpack build
        if (properties.isDevelopmentMode) {
            this.debugInspector();
        }
    }

    release(): void {
        this.spritesManager?.release();
        this.meshesManager?.release();
    }

    // ------------------------
    //   Load and Release
    // ------------------------

    abstract onLoad(): void;
    abstract onLoaded(canvasSize: DimensionsWH): void;

    // abstract onRelease(): void;
    // abstract onReleased(): void;

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
