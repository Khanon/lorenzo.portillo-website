import {
    Scene as BabylonJsScene,
    Engine as BjsEngine,
    ArcRotateCamera,
    Vector3,
    HemisphericLight,
    Mesh,
    MeshBuilder,
    Color4,
    SceneLoader,
} from '@babylonjs/core';

import { Engine } from './engine';

export class Scene {
    private readonly handler: BabylonJsScene;
    private readonly engine: Engine;
    private readonly canvas: HTMLCanvasElement;

    get sceneBabylonjs(): BabylonJsScene {
        return this.handler;
    }

    constructor(engine: Engine, canvas: HTMLCanvasElement) {
        this.engine = engine;
        this.canvas = canvas;
        this.handler = new BabylonJsScene(engine.engineBabylonjs);
        this.handler.clearColor = new Color4(0.0, 0.0, 0.0, 0.0);

        /*
        SceneLoader.Append(
            'assets/mesh/',
            'world3d.babylon',
            this.sceneBabylonjs,
            function (scene) {
                // do something with the scene
            }
        );

        const camera: ArcRotateCamera = new ArcRotateCamera(
            'Camera',
            Math.PI / 2,
            Math.PI / 2,
            2,
            Vector3.Zero(),
            this.sceneBabylonjs
        );
        camera.attachControl(canvas, true);
        const light1: HemisphericLight = new HemisphericLight(
            'light1',
            new Vector3(1, 1, 0),
            this.sceneBabylonjs
        );*/

        /*const sphere: Mesh = MeshBuilder.CreateSphere(
            'sphere',
            { diameter: 1 },
            this.babylonjs
        );*/

        window.addEventListener('keydown', (ev) => {
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === 'I') {
                if (this.sceneBabylonjs.debugLayer.isVisible()) {
                    this.sceneBabylonjs.debugLayer.hide();
                } else {
                    this.sceneBabylonjs.debugLayer.show();
                }
            }
        });
    }
}
