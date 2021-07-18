import { Scene as BabylonJsScene } from '@babylonjs/core/scene';
import { SpriteManager } from '@babylonjs/core/Sprites/spriteManager';
import { Subscription } from 'rxjs';

// Inspector (only dev mode), these comments will be replaced from webpack.dev.js
/* babylonjs-debugLayer */
/* babylonjs-inspector */

import { Engine, Logger, Sprite, SpriteInstance, SpriteProperties } from '..';
import { CoreSubscriptions, DimensionsWH } from '../../models';
import { SceneStart } from './scene-start';

export abstract class Scene {
    babylonjs: BabylonJsScene;

    protected engine: Engine;
    protected canvas: HTMLCanvasElement;
    protected coreSubscriptions: CoreSubscriptions;
    protected logger: Logger;

    // Subscriptions
    private subscriptions: Subscription[] = [];

    // Sprites
    private readonly MAX_SPRITES_PER_INSTANCE = 255;
    private readonly spriteInstances: SpriteInstance[] = [];

    /**
     * Create babylonjs scene, trigger onLoad.
     * @param properties
     */
    start(properties: SceneStart): void {
        this.engine = properties.engine;
        this.canvas = properties.canvas;
        this.coreSubscriptions = properties.coreSubscriptions;
        this.logger = properties.logger;
        this.babylonjs = new BabylonJsScene(this.engine.babylonjs);

        this.onLoad();
        this.babylonjs.executeWhenReady(() => {
            // Once the scene is loaded, register a render loop
            this.engine.babylonjs.runRenderLoop(() => {
                this.babylonjs.render();
            });

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
        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
        this.subscriptions = [];
    }

    // ------------------------
    //   Sprite methods
    // ------------------------

    /**
     * Create a new Sprite using the corresponding instance
     * @param url
     * @param cellSize
     * @returns
     */
    addSprite(url: string, properties: SpriteProperties): Sprite {
        return new Sprite(this.getSpriteInstance(url, properties), properties);
    }

    /**
     *
     * @param url Create a new instance of SpriteManager or return existing
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
                '',
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
