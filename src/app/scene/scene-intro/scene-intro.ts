import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { UniversalCamera } from '@babylonjs/core/Cameras/universalCamera';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { Control } from '@babylonjs/gui/2D/controls/control';
import { TextBlock } from '@babylonjs/gui/2D/controls/textBlock';

import { Actor2D, Actor3D, DimensionsWH, GUI, Mesh, Misc, Scene, Sprite } from '../../../core';

import { EarthActor } from './actors/earth/earth-actor';
import { SunActor } from './actors/sun/sun-actor';
import { LogoActor } from './actors/logo/logo-actor';

export class SceneIntro extends Scene {
    // Scene 3D objects
    private camera: UniversalCamera;
    private light: HemisphericLight;

    // Actors
    logo: Actor2D;
    sun: Actor2D;
    earth: Actor3D;

    // ******************
    // Debug 8a8f delete
    gui: GUI;
    textCanvasSize: TextBlock;
    animationTest: number = -1;
    // ******************

    onLoad(): void {
        // ******************
        // Debug
        this.gui = new GUI(this);
        this.textCanvasSize = this.gui.newTextBlock();
        this.textCanvasSize.left = 0;
        this.textCanvasSize.top = 500;
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

        // Earth
        const earthMesh = this.addMesh(() => {
            const flatMaterial = new StandardMaterial('', this.babylonjs);
            flatMaterial.disableLighting = true;
            flatMaterial.emissiveColor = new Color3(0.13, 0.13, 0.13);
            const mesh = MeshBuilder.CreateSphere('earth', {
                segments: 128,
            });
            mesh.material = flatMaterial;
            return mesh;
        });
        this.earth = new EarthActor('earth', earthMesh, this.coreSubscriptions.loopUpdate);
        this.addActor(this.earth);

        // Logo
        const logoSprite = this.addSprite('logo', './assets/scene-loading/sprites/logo.png', { width: 453, height: 115, numFrames: 59 });
        this.logo = new LogoActor('sun', logoSprite, this.coreSubscriptions.loopUpdate);
        this.addActor(this.logo);

        // Sun
        const sunSprite = this.addSprite('sun', './assets/scene-loading/sprites/sun.png', { width: 270, height: 270, numFrames: 1 });
        this.sun = new SunActor('sun', sunSprite, this.coreSubscriptions.loopUpdate);
        this.addActor(this.sun);
    }

    onLoaded(canvasDimensions: DimensionsWH): void {
        this.textCanvasSize.text = `Canvas: ${canvasDimensions.width} x ${canvasDimensions.height} (Ratio: ${
            canvasDimensions.width / canvasDimensions.height
        })`;

        // Setup the scene
        this.babylonjs.clearColor = new Color4(0.19, 0.19, 0.19, 1.0);

        // Attach imported camera to canvas inputs
        this.babylonjs.activeCamera.attachControl(this.canvas);

        // Add subscriptions
        this.subscribeLoopUpdate();
        this.subscribeCanvasResize();

        // 8a8f Test states
        this.earth.state.setState('initialize');
        this.logo.state.setState('initialize');
        this.sun.state.setState('initialize');
        this.earth.state.setState('motion');
        this.logo.state.setState('motion');
        this.sun.state.setState('motion');

        // Input subscriptions
        this.canvas.addEventListener('keydown', (event) => {
            console.log('aki keydown', event.code, event.code);
            const inc = event.altKey ? (event.ctrlKey ? 0.0001 : 0.001) : 0.01;
            // const obj = this.earth;
            const obj = this.sun;
            if (event.code === 'Numpad4') {
                obj.incZ(inc);
                console.log('aki position:', obj.getX(), obj.getY(), obj.getZ(), obj.getScale());
            }
            if (event.code === 'Numpad6') {
                obj.incZ(-inc);
                console.log('aki position:', obj.getX(), obj.getY(), obj.getZ(), obj.getScale());
            }
            if (event.code === 'Numpad8') {
                obj.incY(inc);
                console.log('aki position:', obj.getX(), obj.getY(), obj.getZ(), obj.getScale());
            }
            if (event.code === 'Numpad2') {
                obj.incY(-inc);
                console.log('aki position:', obj.getX(), obj.getY(), obj.getZ(), obj.getScale());
            }
            if (event.code === 'Numpad9') {
                // obj.babylonjs.position.x += inc;
                obj.setScale(obj.getScale() - inc);
                console.log('aki position:', obj.getX(), obj.getY(), obj.getZ(), obj.getScale());
            }
            if (event.code === 'Numpad3') {
                // obj.babylonjs.position.x -= inc;
                obj.setScale(obj.getScale() + inc);
                console.log('aki position:', obj.getX(), obj.getY(), obj.getZ(), obj.getScale());
            }
            if (event.code === 'End') {
            }
            if (event.code === 'Home') {
            }
            if (event.code === 'PageUp') {
                this.animationTest = 1;
            }
            if (event.code === 'PageDown') {
                this.animationTest = 0;
            }
            if (event.code === 'Insert') {
                this.animationTest = 3;
            }
            if (event.code === 'Delete') {
                this.animationTest = 2;
            }
        });

        this.canvas.addEventListener('pointermove', () => {});
        this.canvas.addEventListener('pointerdown', () => {});
        this.canvas.addEventListener('pointerup', () => {});
    }

    subscribeLoopUpdate(): void {
        // this.sun.babylonjs.position.y = 0.2699; // Start
        // this.sun.babylonjs.position.z = -3.4699;
        // this.sun.setScale(1.15);
        // this.sun.babylonjs.position.y = 0.8;
        // this.sun.babylonjs.position.z = -1.9; // End
        // this.sun.setScale(0.7);

        this.addSubscription(
            this.coreSubscriptions.loopUpdate.subscribe((delta) => {
                const speed = 0.1 * delta;
                const acc = 2;

                // Move sun test from end to start
                /*if (this.animationTest === 0) {
                    this.sun.babylonjs.position.y = Misc.Maths.increaseValue(this.sun.babylonjs.position.y, 0.2699, speed);
                    this.sun.babylonjs.position.z = Misc.Maths.increaseValue(this.sun.babylonjs.position.z, -3.4699, speed);
                    this.sun.setScale(Misc.Maths.increaseValue(this.sun.getScale(), 1.15, speed));
                    // console.log('aki A VER', this.sun.babylonjs.position.y, this.sun.babylonjs.position.z, this.sun.getScale());
                }
                if (this.animationTest === 2) {
                    const result = Misc.Maths.increaseVectorWithInertia(
                        [this.sun.babylonjs.position.y, this.sun.babylonjs.position.z, this.sun.getScale()],
                        [0.2699, 1.4699, 1.15],
                        speed,
                        acc
                    );
                    this.sun.babylonjs.position.y = result[0];
                    this.sun.babylonjs.position.z = result[1];
                    this.sun.setScale(result[2]);
                    // console.log(
                    //     'aki A VER',
                    //     this.sun.babylonjs.position.y.toPrecision(5),
                    //     this.sun.babylonjs.position.z.toPrecision(5),
                    //     this.sun.getScale().toPrecision(5)
                    // );
                }
                // Move sun test start end to end
                if (this.animationTest === 1) {
                    this.sun.babylonjs.position.y = Misc.Maths.increaseValue(this.sun.babylonjs.position.y, 0.8, speed);
                    this.sun.babylonjs.position.z = Misc.Maths.increaseValue(this.sun.babylonjs.position.z, -1.9, speed);
                    this.sun.setScale(Misc.Maths.increaseValue(this.sun.getScale(), 0.7, speed));
                    // console.log('aki A VER', this.sun.babylonjs.position.y, this.sun.babylonjs.position.z, this.sun.getScale());
                }
                if (this.animationTest === 3) {
                    const result = Misc.Maths.increaseVectorWithInertia(
                        [this.sun.babylonjs.position.y, this.sun.babylonjs.position.z, this.sun.getScale()],
                        [0.8, -1.9, 0.7],
                        speed,
                        acc
                    );
                    this.sun.babylonjs.position.y = result[0];
                    this.sun.babylonjs.position.z = result[1];
                    this.sun.setScale(result[2]);
                    // console.log('aki A VER', this.sun.babylonjs.position.y, this.sun.babylonjs.position.z, this.sun.getScale());
                }*/
            })
        );
    }

    subscribeCanvasResize(): void {
        this.addSubscription(
            this.coreSubscriptions.canvasResize.subscribe((dimensions) => {
                this.textCanvasSize.text = `Canvas: ${dimensions.width} x ${dimensions.height} (Ratio: ${dimensions.width / dimensions.height})`;
            })
        );
    }
}
