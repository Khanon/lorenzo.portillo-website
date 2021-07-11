import { Scene as BabylonJsScene } from '@babylonjs/core/scene';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { Color4 } from '@babylonjs/core/Maths/math.color';
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader';

// Inspector (only dev mode), these comments will be replaced from webpack.dev.js
/* babylonjs-debugLayer */
/* babylonjs-inspector */

import { Engine } from './engine';

export class Scene {
    readonly babylonjs: BabylonJsScene;

    private readonly engine: Engine;
    private readonly canvas: HTMLCanvasElement;

    constructor(
        engine: Engine,
        canvas: HTMLCanvasElement,
        private readonly isDevelopmentMode: boolean
    ) {
        this.engine = engine;
        this.canvas = canvas;
        this.babylonjs = new BabylonJsScene(engine.babylonjs);
        this.babylonjs.clearColor = new Color4(0.0, 0.0, 0.0, 0.0);

        SceneLoader.Append(
            './assets/mesh/',
            'world3d.babylon',
            this.babylonjs,
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
            this.babylonjs
        );

        camera.attachControl(canvas, true);
        const light1: HemisphericLight = new HemisphericLight(
            'light1',
            new Vector3(1, 1, 0),
            this.babylonjs
        );

        /*const sphere: Mesh = MeshBuilder.CreateSphere(
            'sphere',
            { diameter: 1 },
            this.babylonjs
        );*/

        // Babylonjs inspector (only DEV mode). Babylonjs inspector imports are removed on webpack build
        if (this.isDevelopmentMode) {
            this.debugAllowInspector();
        }
    }

    private debugAllowInspector(): void {
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
