import { UniversalCamera } from '@babylonjs/core/Cameras/universalCamera';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { TextBlock } from '@babylonjs/gui/2D/controls/textBlock';
import { CoreGlobals, GUI, Scene } from '@khanonjs/engine';

import { AppSceneProperties } from '../app-scene-properties';

export class SceneWorld extends Scene {
    static id: string = 'SceneWorld';
    id = SceneWorld.id;

    private camera: UniversalCamera;

    // ******************
    // Debug TODO: delete
    gui: GUI;
    textCanvasSize: TextBlock;
    // ******************

    constructor(protected readonly properties: AppSceneProperties) {
        super(properties);
    }

    onLoad(): void {
        // Fixed camera
        this.camera = new UniversalCamera('camera', new Vector3(-10, 0, 0), this.babylonjs);
        this.camera.target = new Vector3(1, 0, 0);
        this.camera.inputs.clear();
        // this.camera.minZ = 0.01; // Let it go closer to the earth (reduce distance with near clipping plane)
        this.camera.attachControl(CoreGlobals.canvas, true);

        const light1: HemisphericLight = new HemisphericLight('light1', new Vector3(1, 0, 0), this.babylonjs);

        /* const flatMaterial = new StandardMaterial('', this.babylonjs);
        flatMaterial.disableLighting = true;
        flatMaterial.emissiveColor = new Color3(0.13, 0.13, 0.13);

        const sphere = MeshBuilder.CreateSphere('sphere', {});
        sphere.material = flatMaterial;
        sphere.position.x = -1;
        sphere.position.y = -1; */

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
        ); */
    }

    onPlay(): void {
        // Get scene objects
        const World3D = this.babylonjs.getMeshByID('Icosphere');
        console.log('aki World3D:', World3D);
        World3D.visibility = 1;

        // Add subscriptions
        this.subscribeCanvasResize();

        // Inputs
        let lastPointerX: number;
        let lastPointerY: number;
        let pointerDiffX: number;
        let pointerDiffY: number;
        let click: number = 0;
        let zoom: boolean;

        CoreGlobals.canvas.addEventListener('keydown', (event) => {
            console.log('aki keydown', event.key, event.code);
            const inc = event.altKey ? (event.ctrlKey ? 0.01 : 0.1) : 1;
            if (event.code === 'Numpad4' || event.code === 'ArrowLeft') {
                this.camera.position.z += inc;
                console.log('aki position:', this.camera.position.x, this.camera.position.y, this.camera.position.z);
            }
            if (event.code === 'Numpad6' || event.code === 'ArrowRight') {
                this.camera.position.z -= inc;
                console.log('aki position:', this.camera.position.x, this.camera.position.y, this.camera.position.z);
            }
            if (event.code === 'Numpad8' || event.code === 'ArrowUp') {
                this.camera.position.y += inc;
                console.log('aki position:', this.camera.position.x, this.camera.position.y, this.camera.position.z);
            }
            if (event.code === 'Numpad2' || event.code === 'ArrowDown') {
                this.camera.position.y -= inc;
                console.log('aki position:', this.camera.position.x, this.camera.position.y, this.camera.position.z);
            }
            if (event.code === 'Numpad9') {
                this.camera.position.x += inc;
                console.log('aki position:', this.camera.position.x, this.camera.position.y, this.camera.position.z);
            }
            if (event.code === 'Numpad3') {
                this.camera.position.x -= inc;
                console.log('aki position:', this.camera.position.x, this.camera.position.y, this.camera.position.z);
            }
        });

        CoreGlobals.canvas.addEventListener('pointermove', () => {
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
        CoreGlobals.canvas.addEventListener('pointerdown', () => {
            click++;
            if (click > 1) {
                zoom = true;
            }
            lastPointerX = this.babylonjs.pointerX;
            lastPointerY = this.babylonjs.pointerY;
            // console.log('Mouse DOWN!');
        });
        CoreGlobals.canvas.addEventListener('pointerup', () => {
            click--;
            // console.log('Mouse UP!');
        });
    }

    onStop(): void {}

    onRelease(): void {}

    onError(errorMsg: string): void {
        CoreGlobals.onError$.next(errorMsg);
    }

    subscribeCanvasResize(): void {
        this.addSubscription(
            CoreGlobals.canvasResize$.subscribe((dimensions) => {
                this.textCanvasSize.text = `Canvas: ${dimensions.width} x ${dimensions.height}`;
            })
        );
    }
}
