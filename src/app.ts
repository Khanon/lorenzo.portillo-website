import '@babylonjs/core/Debug/debugLayer';
import '@babylonjs/inspector';
import '@babylonjs/loaders/glTF';

import { Engine, Scene } from './core';

class App {
    constructor() {
        // Create the canvas HTML element and attach it to #canvas-container
        const canvasContainer = document.getElementById('canvas-container');
        const canvas = document.createElement('canvas');
        canvas.id = 'canvas';
        canvasContainer.appendChild(canvas);

        // Initialize babylon.js
        const engine = new Engine(canvas);
        const scene = new Scene(engine, canvas);

        // Main render loop
        engine.babylonjs.runRenderLoop(() => {
            scene.babylonjs.render();
        });
    }
}
new App();
