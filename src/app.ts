import '@babylonjs/core/Debug/debugLayer';
import '@babylonjs/inspector';
import '@babylonjs/loaders/glTF';
import {
    Engine,
    Scene,
    ArcRotateCamera,
    Vector3,
    HemisphericLight,
    Mesh,
    MeshBuilder,
} from '@babylonjs/core';

class App {
    constructor() {
        // Create the canvas HTML element and attach it to #canvas-container
        var canvasContainer = document.getElementById('canvas-container');
        var canvas = document.createElement('canvas');
        canvas.id = 'canvas';
        canvasContainer.appendChild(canvas);

        // Initialize babylon scene and engine
        var engine = new Engine(canvas, true);
        var scene = new Scene(engine);

        var camera: ArcRotateCamera = new ArcRotateCamera(
            'Camera',
            Math.PI / 2,
            Math.PI / 2,
            2,
            Vector3.Zero(),
            scene
        );
        camera.attachControl(canvas, true);
        var light1: HemisphericLight = new HemisphericLight(
            'light1',
            new Vector3(1, 1, 0),
            scene
        );
        var sphere: Mesh = MeshBuilder.CreateSphere(
            'sphere',
            { diameter: 1 },
            scene
        );

        // hide/show the Inspector
        window.addEventListener('keydown', (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show();
                }
            }
        });

        // run the main render loop
        engine.runRenderLoop(() => {
            scene.render();
        });
    }
}
new App();
