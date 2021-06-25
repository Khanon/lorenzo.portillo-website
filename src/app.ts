import '@babylonjs/core/Debug/debugLayer';
import '@babylonjs/inspector';
import '@babylonjs/loaders/glTF';

import { AssetsManager, Engine, Scene, StateMachine } from './core';
import { StateLoading } from './app/index';

class App {
    readonly states: StateMachine = new StateMachine();
    engine: Engine;
    scene: Scene;
    assets: AssetsManager;

    constructor() {
        // Create the canvas HTML element and attach it to #canvas-container
        const canvasContainer = document.getElementById('canvas-container');
        const canvas = document.createElement('canvas');
        canvas.id = 'canvas';
        canvasContainer.appendChild(canvas);

        // Initialize babylon.js
        this.engine = new Engine(canvas);
        this.scene = new Scene(this.engine, canvas);
        this.assets = new AssetsManager(this.scene);

        // Main render loop
        this.engine.engineBabylonjs.runRenderLoop(() => {
            this.scene.sceneBabylonjs.render();
        });

        this.init();
    }

    init(): void {
        this.states.GoTo(new StateLoading(this.scene));
    }
}
new App();
