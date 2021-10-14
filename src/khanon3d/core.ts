import '@babylonjs/core/Loading/loadingScreen';
import '@babylonjs/core/Loading/Plugins/babylonFileLoader';
import '@babylonjs/core/Materials/PBR/pbrMaterial';

import { Engine } from './modules/engine/engine';
import { Logger } from './modules/logger/logger';
import { Scene } from './modules/scene/scene';
import { DimensionsWH } from './models/dimensions-wh';
import { CoreProperties } from './models/core-properties';
import { WorkerTimer } from './workers/worker-timer';
import { CoreGlobals } from './models/core-globals';

export class Core {
    private canvas: HTMLCanvasElement;

    // Loop update
    private loopUpdateLastMs: number;
    private loopUpdateFPS: number;
    private loopUpdateDelay: number;

    // Engine
    private engine: Engine;

    constructor(private readonly properties: CoreProperties) {
        this.loopUpdateDelay = this.properties.delayUpdate ?? 0;
        this.loopUpdateFPS = 1000 / this.properties.fps;
        CoreGlobals.isDevelopmentMode = !!this.properties.isDevelopmentMode;
        if (this.properties.onAppError) {
            CoreGlobals.onError$.subscribe({ next: (errorMsg: string) => this.properties.onAppError(errorMsg) });
        }
    }

    /**
     * Creates and append canvas to a div element
     */
    createCanvasOnDivElement(divId: string): HTMLCanvasElement {
        const canvasContainer = document.getElementById(divId);
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'canvas';
        canvasContainer.appendChild(this.canvas);
        CoreGlobals.canvasDimensions = this.getCanvasDimensions();
        return this.canvas;
    }

    /**
     * Starts BabylonJs
     */
    start(): void {
        this.engine = new Engine(this.canvas, { fpsContainer: this.properties.fpsContainer });

        // Start loop update
        this.loopUpdate();

        // Log info on startup
        Logger.info('Environment mode:', process.env.NODE_ENV);
        this.logCanvasSize();

        // Manage resize
        window.addEventListener('resize', () => {
            const canvasDimensions = this.getCanvasDimensions();
            this.engine.babylonjs.resize();
            CoreGlobals.canvasDimensions = canvasDimensions;
            CoreGlobals.canvasResize$.next(canvasDimensions);
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
     * Set current scene
     */
    addScene(scene: Scene): Scene {
        this.engine.addScene(scene);
        return scene;
    }

    /**
     * Call loop update subscribers with a delta time parameter
     */
    loopUpdate(): void {
        this.loopUpdateLastMs = performance.now();
        WorkerTimer.setInterval(
            () => {
                const currentMs = performance.now();
                const interval = currentMs - this.loopUpdateLastMs;
                if (interval > this.loopUpdateDelay) {
                    let delta = interval / this.loopUpdateFPS;
                    CoreGlobals.loopUpdate$.next(delta);
                    CoreGlobals.physicsUpdate$.next(delta);
                    this.loopUpdateLastMs = currentMs;
                }
            },
            0,
            this
        );
    }
}
