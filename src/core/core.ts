import '@babylonjs/core/Loading/loadingScreen';
import '@babylonjs/core/Loading/Plugins/babylonFileLoader';
import '@babylonjs/core/Materials/PBR/pbrMaterial';

import { Observable, Subject } from 'rxjs';

import { Engine } from './modules/engine/engine';
import { Logger } from './modules/logger/logger';
import { Scene } from './modules/scene/scene';
import { SceneStart } from './modules/scene/scene-start';
import { DimensionsWH } from './models/dimensions-wh';
import { CoreProperties } from './models/core-properties';
import { CoreSubscriptions } from './models/core-subscriptions';

export class Core {
    private canvas: HTMLCanvasElement;

    // Loop update
    private loopUpdateLastMs: number;
    private loopUpdateFPS: number;
    private loopUpdateDelay: number;

    // BabylonJs
    private engine: Engine;

    // Events
    private readonly canvasResize: Subject<DimensionsWH> = new Subject<DimensionsWH>();
    private readonly loopUpdate: Subject<number> = new Subject<number>();

    constructor(private readonly properties: CoreProperties) {
        this.loopUpdateDelay = this.properties.delayUpdate ?? 0;
        this.loopUpdateFPS = 1000 / this.properties.fps;
    }

    /**
     * Creates and append canvas to a div element
     */
    createCanvasOnDivElement(divId: string): HTMLCanvasElement {
        const canvasContainer = document.getElementById(divId);
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'canvas';
        canvasContainer.appendChild(this.canvas);

        return this.canvas;
    }

    /**
     * Starts BabylonJs
     */
    start(): void {
        this.engine = new Engine(this.canvas);

        // Start loop update
        this.starLoopUpdate();

        // Log info on startup
        Logger.info('Environment mode:', process.env.NODE_ENV);
        this.logCanvasSize();

        // Manage resize
        window.addEventListener('resize', () => {
            this.engine.babylonjs.resize();
            this.canvasResize.next(this.getCanvasDimensions());
            // this.logCanvasSize();
        });
    }

    /**
     * Log canvas size { width, height }
     */
    logCanvasSize(): void {
        const canvasDimensions = this.getCanvasDimensions();
        Logger.info('Canvas size:', canvasDimensions.width, canvasDimensions.height);
    }

    /**
     * Canvas width
     * @returns
     */
    getCanvasDimensions(): DimensionsWH {
        return { width: Math.floor(this.canvas.getBoundingClientRect().width), height: Math.floor(this.canvas.getBoundingClientRect().height) };
    }

    /**
     * Canvas resize subscription
     * @returns
     */
    canvasResize$(): Observable<DimensionsWH> {
        return this.canvasResize;
    }

    /**
     * Set current scene
     */
    setScene(scene: Scene, sceneProperties?: SceneStart): void {
        const properties = {
            engine: this.engine,
            canvas: this.canvas,
            canvasDimensions: this.getCanvasDimensions(),
            coreSubscriptions: this.getCoreSubscriptions(),
        };
        Object.assign(properties, sceneProperties);

        scene.start(properties);
    }

    /**
     * Get subscriptions
     * @returns
     */
    getCoreSubscriptions(): CoreSubscriptions {
        return {
            canvasResize: this.canvasResize,
            loopUpdate$: this.loopUpdate,
        };
    }

    /**
     * Call loop update subscribers with a delta time parameter
     */
    starLoopUpdate(): void {
        this.loopUpdateLastMs = performance.now();
        setInterval(() => {
            const currentMs = performance.now();
            const interval = currentMs - this.loopUpdateLastMs;
            if (interval > this.loopUpdateDelay) {
                const delta = interval / this.loopUpdateFPS;
                this.loopUpdate.next(delta);
                this.loopUpdateLastMs = currentMs;
            }
        }, 1);
    }
}
