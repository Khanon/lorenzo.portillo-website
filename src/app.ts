import '@babylonjs/core/Loading/loadingScreen';
import '@babylonjs/core/Loading/Plugins/babylonFileLoader';
import '@babylonjs/core/Materials/PBR/pbrMaterial';

import { AssetsManager, Engine, Scene, StateMachine } from './core';
import { StateLoading } from './app/index';

class App {
    readonly states: StateMachine = new StateMachine();
    engine: Engine;
    scene: Scene;
    assets: AssetsManager;

    constructor() {
        // Log environment mode
        console.log('Environment mode:', process.env.NODE_ENV);

        // Create the canvas HTML element and attach it to #canvas-container
        const canvasContainer = document.getElementById('canvas-container');
        const canvas = document.createElement('canvas');
        canvas.id = 'canvas';
        canvasContainer.appendChild(canvas);

        // Initialize babylon.js
        this.engine = new Engine(canvas);
        this.scene = new Scene(this.engine, canvas, this.isDevelopmentMode());
        this.assets = new AssetsManager(this.scene);

        this.init();
    }

    init(): void {
        this.states.GoTo(new StateLoading(this.scene));
    }

    isDevelopmentMode(): boolean {
        return process.env.NODE_ENV === 'development';
    }
}
new App();
