import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { UniversalCamera } from '@babylonjs/core/Cameras/universalCamera';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader';
import { Control } from '@babylonjs/gui/2D/controls/control';
import { TextBlock } from '@babylonjs/gui/2D/controls/textBlock';

import { DimensionsWH, GUI, Scene, Sprite } from '../../../khanon3d';

export class SceneWorld extends Scene {
    private logo: Sprite;

    // ******************
    // Debug TODO: delete
    gui: GUI;
    textCanvasSize: TextBlock;
    // ******************

    onLoad(): void {
        // ******************
        // Debug
        this.gui = new GUI(this);
        this.textCanvasSize = this.gui.newTextBlock();
        this.textCanvasSize.left = 0;
        this.textCanvasSize.top = 300;
        this.textCanvasSize.width = '200px';
        this.textCanvasSize.height = '40px';
        this.textCanvasSize.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.textCanvasSize.textHorizontalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        this.textCanvasSize.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.textCanvasSize.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        this.textCanvasSize.text = 'TEXT BLOCK';
        this.textCanvasSize.color = '#fcf403';
        // ******************

        SceneLoader.Append('./assets/mesh/', 'world3d.babylon', this.babylonjs, (scene) => {
            // do something with the scene
        });

        const camera: UniversalCamera = new UniversalCamera('Camera', new Vector3(-3, 0, 0), this.babylonjs);
        camera.target = new Vector3(1, 0, 0);
        camera.inputs.clear();
        camera.attachControl(this.canvas, true);

        const light1: HemisphericLight = new HemisphericLight('light1', new Vector3(1, 0, 0), this.babylonjs);

        const flatMaterial = new StandardMaterial('', this.babylonjs);
        flatMaterial.disableLighting = true;
        flatMaterial.emissiveColor = new Color3(0.13, 0.13, 0.13);

        const sphere = MeshBuilder.CreateSphere('sphere', {});
        sphere.material = flatMaterial;
        sphere.position.x = -1;
        sphere.position.y = -1;

        // Logo
        // this.logo = this.addSprite('', './assets/sprites/logo.png', { width: 453, height: 115, numFrames: 59 });
        // logo.setFrame(50);
        // this.logo.play(50, false);

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
    }

    onExecute(canvasDimensions: DimensionsWH): void {
        console.log('aki onLoaded, canvas dimensions:', canvasDimensions);
        this.textCanvasSize.text = `Canvas: ${canvasDimensions.width} x ${canvasDimensions.height}`;

        // Setup the scene
        this.babylonjs.clearColor = new Color4(0.19, 0.19, 0.19, 1.0);

        // Get scene objects
        const World3D = this.babylonjs.getMeshByID('Icosphere');
        console.log('aki World3D:', World3D);
        World3D.visibility = 0;

        // Attach imported camera to canvas inputs
        // scene.activeCamera.attachControl(canvas);

        // Add subscriptions
        this.subscribeCanvasResize();

        // Inputs
        let lastPointerX: number;
        let lastPointerY: number;
        let pointerDiffX: number;
        let pointerDiffY: number;
        let click: number = 0;
        let zoom: boolean;

        this.canvas.addEventListener('keydown', (event) => {
            console.log('aki keydown', event.key, event.code);
            if (event.key === 'ArrowLeft') {
                this.logo.babylonjs.position.z += 0.01;
                console.log('aki position:', this.logo.babylonjs.position.x, this.logo.babylonjs.position.y, this.logo.babylonjs.position.z);
            }
            if (event.key === 'ArrowRight') {
                this.logo.babylonjs.position.z -= 0.01;
                console.log('aki position:', this.logo.babylonjs.position.x, this.logo.babylonjs.position.y, this.logo.babylonjs.position.z);
            }
            if (event.key === 'ArrowUp') {
                this.logo.babylonjs.position.y += 0.01;
                console.log('aki position:', this.logo.babylonjs.position.x, this.logo.babylonjs.position.y, this.logo.babylonjs.position.z);
            }
            if (event.key === 'ArrowDown') {
                this.logo.babylonjs.position.y -= 0.01;
                console.log('aki position:', this.logo.babylonjs.position.x, this.logo.babylonjs.position.y, this.logo.babylonjs.position.z);
            }
        });

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
    }

    onRelease(): void {}

    onError(errorMsg: string): void {}

    subscribeCanvasResize(): void {
        this.addSubscription(
            this.coreSubscriptions.canvasResize$.subscribe((dimensions) => {
                this.textCanvasSize.text = `Canvas: ${dimensions.width} x ${dimensions.height}`;
            })
        );
    }
}
