import { tap } from 'rxjs';

import { Scene as BabylonJsScene } from '@babylonjs/core/scene';

// Inspector (only dev mode), these comments will be replaced from webpack.dev.js
/* babylonjs-debugLayer */
/* babylonjs-inspector */

import { ActionsManager } from '../actions/actions-manager';
import { CoreSubscriptions } from '../../models/core-subscriptions';
import { DimensionsWH } from '../../models/dimensions-wh';
import { Engine } from '../engine/engine';
import { SceneProperties } from './scene-properties';
import { ParticlesFactory } from '../particle/particles-factory';
import { Subscriber } from '../../models/subscriber';
import { SpritesManager } from '../sprite/sprites-manager';
import { MeshesManager } from '../mesh/meshes-manager';
import { ActorsManager } from '../actor/actors-manager';
import { ObservablesContainer } from '../../models/observables-container';
import { AssetsManager } from '../assets-manager/assets-manager';
import { Logger } from '../logger/logger';

export abstract class Scene extends Subscriber {
    babylonjs: BabylonJsScene;

    protected engine: Engine;
    protected canvas: HTMLCanvasElement;
    protected assetsJsonUrl: string;
    protected coreSubscriptions: CoreSubscriptions;
    protected isDevelopmentMode: boolean;
    protected isExecuted: boolean = false;

    // Shared scene observables with actors
    protected observables: ObservablesContainer = new ObservablesContainer();

    // Managers
    protected assetsManager: AssetsManager;
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
        this.assetsJsonUrl = properties.assetsJsonUrl;
        this.coreSubscriptions = properties.coreSubscriptions;
        this.isDevelopmentMode = properties.isDevelopmentMode;
        this.isExecuted = false;

        this.babylonjs = new BabylonJsScene(this.engine.babylonjs);
        this.assetsManager = new AssetsManager(this.babylonjs);
        this.spritesManager = new SpritesManager(this.assetsManager);
        this.meshesManager = new MeshesManager(this.assetsManager);
        this.actorsManager = new ActorsManager(this.babylonjs, this.assetsManager, this.spritesManager, this.meshesManager, this.observables);
        this.particles = new ParticlesFactory(this.babylonjs, this.assetsManager);

        this.onLoad();
        this.assetsManager.loadAssets(this.assetsJsonUrl).subscribe({
            error: (error) => {
                const errorMsg = `There was an error loading assets: ${this.assetsJsonUrl}`;
                Logger.error(errorMsg, error);
                this.onError(errorMsg);
            },
            complete: () => {
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
                    this.onLoaded(properties.canvasDimensions);
                });
            },
        });

        // Babylonjs inspector (only DEV mode). Babylonjs inspector imports are removed on webpack build
        if (properties.isDevelopmentMode) {
            this.debugInspector();
        }
    }

    /**
     * Release all scene objects
     */
    release(): void {
        this.assetsManager?.release();
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

    /**
     * On scene loading error
     */
    abstract onError(errorMsg: string): void;

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
