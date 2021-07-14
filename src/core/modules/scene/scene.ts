import { Scene as BabylonJsScene } from '@babylonjs/core/scene';
import { UniversalCamera } from '@babylonjs/core/Cameras/universalCamera';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { Color4 } from '@babylonjs/core/Maths/math.color';
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader';
import { SpriteManager } from '@babylonjs/core/Sprites/spriteManager';

// Inspector (only dev mode), these comments will be replaced from webpack.dev.js
/* babylonjs-debugLayer */
/* babylonjs-inspector */

import { Engine } from '..';
import { Sprite } from '../sprite/sprite';
import { SpriteInstance } from '../sprite/sprite-instance';
import { SpriteProperties } from '../sprite/sprite-properties';

export class Scene {
    readonly babylonjs: BabylonJsScene;

    private readonly engine: Engine;
    private readonly canvas: HTMLCanvasElement;

    // Sprites
    private readonly MAX_SPRITES_PER_INSTANCE = 255;
    private readonly spriteInstances: SpriteInstance[] = [];

    constructor(engine: Engine, canvas: HTMLCanvasElement, private readonly isDevelopmentMode: boolean) {
        this.engine = engine;
        this.canvas = canvas;
        this.babylonjs = new BabylonJsScene(engine.babylonjs);

        SceneLoader.Append('./assets/mesh/', 'world3d.babylon', this.babylonjs, (scene) => {
            // do something with the scene
        });

        const camera: UniversalCamera = new UniversalCamera('Camera', new Vector3(-3, 0, 0), this.babylonjs);
        camera.target = new Vector3(1, 0, 0);
        camera.inputs.clear();
        camera.attachControl(canvas, true);

        const light1: HemisphericLight = new HemisphericLight('light1', new Vector3(1, 1, 0), this.babylonjs);

        // Logo
        const logo = this.addSprite('./assets/sprites/logo.png', { width: 453, height: 115, numFrames: 59, ratio: 0.253 });
        // logo.setFrame(50);
        logo.play(50, false);

        // const actionManager: ActionManager = new ActionManager(this.babylonjs)
        // actionManager.registerAction()

        // const input: InputManager = new InputManager(this.babylonjs)
        // input.attachControl()

        /*
        const sphere: Mesh = MeshBuilder.CreateSphere(
            'sphere',
            { diameter: 1 },
            this.babylonjs
        );*/

        // Executing scene
        this.babylonjs.executeWhenReady(() => {
            console.log('aki READY!!!!');

            // Setup the scene
            this.babylonjs.clearColor = new Color4(0.19, 0.19, 0.19, 1.0);

            // Get scene objects
            const World3D = this.babylonjs.getMeshByID('Icosphere');
            console.log('aki World3D:', World3D);
            World3D.visibility = 0;

            // Attach imported camera to canvas inputs
            // scene.activeCamera.attachControl(canvas);

            // Inputs
            let lastPointerX: number;
            let lastPointerY: number;
            let pointerDiffX: number;
            let pointerDiffY: number;
            let click: number = 0;
            let zoom: boolean;

            this.canvas.addEventListener('pointermove', () => {
                // console.log(Vector3.Zero(), 'aki MOUSE MOVE', this.babylonjs.pointerX, this.babylonjs.pointerY, click);

                if (click === 1) {
                    if (zoom) {
                        zoom = false;
                    } else {
                        pointerDiffX = lastPointerX - this.babylonjs.pointerX;
                        pointerDiffY = lastPointerY - this.babylonjs.pointerY;

                        World3D.rotateAround(Vector3.Zero(), new Vector3(0, 1, 0), pointerDiffX * 0.005);
                        World3D.rotateAround(Vector3.Zero(), new Vector3(0, 0, -1), pointerDiffY * 0.005);
                    }
                }

                lastPointerX = this.babylonjs.pointerX;
                lastPointerY = this.babylonjs.pointerY;
            });
            this.canvas.addEventListener('pointerdown', () => {
                click++;
                if (click > 1) {
                    zoom = true;
                }
                lastPointerX = this.babylonjs.pointerX;
                lastPointerY = this.babylonjs.pointerY;
                // console.log('Mouse DOWN!');
            });
            this.canvas.addEventListener('pointerup', () => {
                click--;
                // console.log('Mouse UP!');
            });

            // Once the scene is loaded, register a render loop
            this.engine.babylonjs.runRenderLoop(() => {
                this.babylonjs.render();
            });
        });

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

    /**
     * Create a new Sprite using the corresponding instance
     * @param url
     * @param cellSize
     * @returns
     */
    addSprite(url: string, properties: SpriteProperties): Sprite {
        return new Sprite(this.spriteGetInstance(url, properties), properties);
    }

    /**
     *
     * @param url Create a new instance of SpriteManager or return existing
     * @param properties
     * @returns
     */
    private spriteGetInstance(url: string, properties: SpriteProperties): SpriteInstance {
        // Search and return existing instance
        this.spriteInstances.forEach((spriteInstance) => {
            if (spriteInstance.url === url) {
                return spriteInstance.babylonjs;
            }
        });

        // Create and return a new instance if not found
        const spriteInstance = {
            url,
            babylonjs: new SpriteManager(
                '',
                url,
                this.MAX_SPRITES_PER_INSTANCE,
                ({ width: properties.width, height: properties.height } = properties),
                this.babylonjs
            ),
        };
        this.spriteInstances.push(spriteInstance);
        return spriteInstance;
    }
}
