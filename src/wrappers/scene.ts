import {
    Scene as BabylonJsScene,
    Engine as BjsEngine,
    ArcRotateCamera,
    Vector3,
    HemisphericLight,
    Mesh,
    MeshBuilder,
    Color4,
} from '@babylonjs/core';

import Engine from './engine';

export default class Scene {
    private readonly handler: BabylonJsScene;
    private readonly engine: Engine;
    private readonly canvas: HTMLCanvasElement;

    get babylonjs(): BabylonJsScene {
        return this.handler;
    }

    constructor(engine: Engine, canvas: HTMLCanvasElement) {
        this.engine = engine;
        this.canvas = canvas;
        this.handler = new BabylonJsScene(engine.babylonjs);
        this.handler.clearColor = new Color4(0.0, 0.0, 0.0, 0.0);

        const camera: ArcRotateCamera = new ArcRotateCamera(
            'Camera',
            Math.PI / 2,
            Math.PI / 2,
            2,
            Vector3.Zero(),
            this.babylonjs
        );
        camera.attachControl(canvas, true);
        const light1: HemisphericLight = new HemisphericLight(
            'light1',
            new Vector3(1, 1, 0),
            this.babylonjs
        );
        const sphere: Mesh = MeshBuilder.CreateSphere(
            'sphere',
            { diameter: 1 },
            this.babylonjs
        );

        window.addEventListener('keydown', (ev) => {
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === 'I') {
                if (this.babylonjs.debugLayer.isVisible()) {
                    this.babylonjs.debugLayer.hide();
                } else {
                    this.babylonjs.debugLayer.show();
                }
            }
        });
    }
}
