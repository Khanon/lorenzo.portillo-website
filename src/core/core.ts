import '@babylonjs/core/Loading/loadingScreen';
import '@babylonjs/core/Loading/Plugins/babylonFileLoader';
import '@babylonjs/core/Materials/PBR/pbrMaterial';

import { Observable, Subject } from 'rxjs';

import { Logger } from './modules/logger';
import { Engine, Scene } from './modules';
import { DimensionsWH, CoreSubscriptions } from './models';

export class Core {
    private logger: Logger;
    private canvas: HTMLCanvasElement;

    // BabylonJs
    engine: Engine;

    // Events
    canvasResize: Subject<DimensionsWH> = new Subject<DimensionsWH>();

    constructor() {
        this.logger = new Logger();
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

        // Log info on startup
        this.logger.logInfo('Environment mode:', process.env.NODE_ENV);
        this.logCanvasSize();

        // Manage resize
        window.addEventListener('resize', () => {
            this.engine.babylonjs.resize();
            this.canvasResize.next(this.getCanvasDimensions());
            this.logCanvasSize();
        });
    }

    /**
     * Returns loggeer class
     * @returns
     */
    getLogger(): Logger {
        return this.logger;
    }

    /**
     * Log canvas size { width, height }
     */
    logCanvasSize(): void {
        const canvasDimensions = this.getCanvasDimensions();
        this.logger.logInfo('Canvas size:', canvasDimensions.width, canvasDimensions.height);
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
    setScene(scene: Scene, isDevelopmentMode?: boolean): void {
        scene.start({
            engine: this.engine,
            canvas: this.canvas,
            canvasDimensions: this.getCanvasDimensions(),
            coreSubscriptions: this.getCoreSubscriptions(),
            logger: this.getLogger(),
            isDevelopmentMode,
        });
    }

    /**
     * Get subscriptions
     * @returns
     */
    getCoreSubscriptions(): CoreSubscriptions {
        return { canvasResize: this.canvasResize };
    }
}
