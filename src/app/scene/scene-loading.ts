import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { UniversalCamera } from '@babylonjs/core/Cameras/universalCamera';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { Control } from '@babylonjs/gui/2D/controls/control';
import { TextBlock } from '@babylonjs/gui/2D/controls/textBlock';

import { Scene, Sprite } from '../../core';
import { DimensionsWH } from '../../core/models/dimensions-wh';
import { GUI } from '../../core';

export class SceneIntro extends Scene {
    private camera: UniversalCamera;
    private light: HemisphericLight;
    private logo: Sprite;
    private sun: Sprite;
    private earth: Mesh;

    // ******************
    // Debug 8a8f delete
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

        // Fixed camera
        this.camera = new UniversalCamera('camera', new Vector3(-3, 0, 0), this.babylonjs);
        this.camera.target = new Vector3(1, 0, 0);
        this.camera.inputs.clear();
        this.camera.minZ = 0.01; // Let it go closer to the earth (reduce distance with near clipping plane)
        this.camera.attachControl(this.canvas, true);

        // Light in front of scene
        this.light = new HemisphericLight('light', new Vector3(1, 0, 0), this.babylonjs);

        const flatMaterial = new StandardMaterial('', this.babylonjs);
        flatMaterial.disableLighting = true;
        flatMaterial.emissiveColor = new Color3(0.13, 0.13, 0.13);

        this.earth = MeshBuilder.CreateSphere('earth', {
            segments: 128,
        });
        this.earth.material = flatMaterial;
        // this.earth.position.x = -2.6996; // Start
        // this.earth.position.y = -0.4112;
        this.earth.position.x = -2.7286; // End
        this.earth.position.y = -0.4792;

        // Logo
        this.logo = this.addSprite('logo', './assets/scene-loading/sprites/logo.png', { width: 453, height: 115, numFrames: 59 });
        this.logo.play(50, false);
        this.logo.babylonjs.position.y = 0.9;
        this.logo.babylonjs.position.z = 1.9;

        // Sun
        this.sun = this.addSprite('sun', './assets/scene-loading/sprites/sun.png', { width: 270, height: 270, numFrames: 1 });
        this.sun.setFrame(0);
        // this.sun.babylonjs.position.y = 0.2699;
        // this.sun.babylonjs.position.z = -3.4699; // Start
        // this.sun.setScale(1.15);
        this.sun.babylonjs.position.y = 0.8;
        this.sun.babylonjs.position.z = -1.9; // End
        this.sun.setScale(0.7);

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

    onLoaded(canvasDimensions: DimensionsWH): void {
        this.textCanvasSize.text = `Canvas: ${canvasDimensions.width} x ${canvasDimensions.height}`;

        // Setup the scene
        this.babylonjs.clearColor = new Color4(0.19, 0.19, 0.19, 1.0);

        // Attach imported camera to canvas inputs
        this.babylonjs.activeCamera.attachControl(this.canvas);

        // Add subscriptions
        this.subscribeCanvasResize();

        // Input subscriptions
        this.canvas.addEventListener('keydown', (event) => {
            console.log('aki keydown', event.code, event.code);
            const inc = event.altKey ? (event.ctrlKey ? 0.0001 : 0.001) : 0.01;
            if (event.code === 'Numpad4') {
                this.sun.babylonjs.position.z += inc;
                console.log('aki position:', this.sun.babylonjs.position.x, this.sun.babylonjs.position.y, this.sun.babylonjs.position.z);
            }
            if (event.code === 'Numpad6') {
                this.sun.babylonjs.position.z -= inc;
                console.log('aki position:', this.sun.babylonjs.position.x, this.sun.babylonjs.position.y, this.sun.babylonjs.position.z);
            }
            if (event.code === 'Numpad8') {
                this.sun.babylonjs.position.y += inc;
                console.log('aki position:', this.sun.babylonjs.position.x, this.sun.babylonjs.position.y, this.sun.babylonjs.position.z);
            }
            if (event.code === 'Numpad2') {
                this.sun.babylonjs.position.y -= inc;
                console.log('aki position:', this.sun.babylonjs.position.x, this.sun.babylonjs.position.y, this.sun.babylonjs.position.z);
            }
            if (event.code === 'Numpad9') {
                // this.sun.babylonjs.position.x += inc;
                this.sun.setScale(this.sun.getScale() - inc);
                console.log('aki position:', this.sun.babylonjs.position.x, this.sun.babylonjs.position.y, this.sun.babylonjs.position.z);
            }
            if (event.code === 'Numpad3') {
                // this.sun.babylonjs.position.x -= inc;
                this.sun.setScale(this.sun.getScale() + inc);
                console.log('aki position:', this.sun.babylonjs.position.x, this.sun.babylonjs.position.y, this.sun.babylonjs.position.z);
            }
            console.log(this.sun.getScale());
        });

        this.canvas.addEventListener('pointermove', () => {});
        this.canvas.addEventListener('pointerdown', () => {});
        this.canvas.addEventListener('pointerup', () => {});
    }

    subscribeCanvasResize(): void {
        this.addSubscription(
            this.coreSubscriptions.canvasResize.subscribe((dimensions) => {
                this.textCanvasSize.text = `Canvas: ${dimensions.width} x ${dimensions.height}`;
            })
        );
    }
}
