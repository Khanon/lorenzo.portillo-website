import { Color4 } from '@babylonjs/core/Maths/math.color';
import { UniversalCamera } from '@babylonjs/core/Cameras/universalCamera';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { Control } from '@babylonjs/gui/2D/controls/control';
import { TextBlock } from '@babylonjs/gui/2D/controls/textBlock';

import { ActorSimplePhysics, DimensionsWH, GUI, Scene } from '../../../core';

import { EarthActor } from './actors/earth/earth-actor';
import { SunActor } from './actors/sun/sun-actor';
import { LogoActor } from './actors/logo/logo-actor';
import { RobocilloActor } from './actors/robocillo/robocillo-actor';
import { RobocilloAnimations } from './actors/robocillo/robocillo-animations';
import { SceneIntroActionGravity } from './actions/action-gravity';
import { SceneIntroShared } from './scene-intro-shared';
import { RobocilloStateIntro } from './actors/robocillo/robocillo-state-intro';

export class SceneIntro extends Scene {
    // Scene 3D objects
    private camera: UniversalCamera;
    private light: HemisphericLight;

    // Shared instances
    sceneIntroShared: SceneIntroShared = new SceneIntroShared();

    // Actors
    logo: LogoActor;
    sun: SunActor;
    earth: EarthActor;
    robocillo: RobocilloActor;

    // Actions
    gravity: SceneIntroActionGravity;

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
        this.textCanvasSize.width = '500px';
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

        // Actors
        this.earth = this.addActor(new EarthActor('earth', { loopUpdate$: this.coreSubscriptions.loopUpdate$ }));
        this.logo = this.addActor(new LogoActor('logo'));
        this.sun = this.addActor(new SunActor('sun', { loopUpdate$: this.coreSubscriptions.loopUpdate$ }));
        this.robocillo = this.addActor(new RobocilloActor('robocillo', { loopUpdate$: this.coreSubscriptions.loopUpdate$, usePhysics: true }));

        // Shared actors
        SceneIntroShared.earth = this.earth;

        // Actions
        this.gravity = new SceneIntroActionGravity('gravity', null, this.coreSubscriptions.loopUpdate$);
        this.actions.registerAction(this.gravity);
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

        // Start motions
        this.earth.state.set('motion');
        this.logo.state.set('motion');
        this.sun.state.set('motion');

        // Start actions
        this.gravity.addActor(this.robocillo);
        this.actions.play('gravity');

        // Start robocillo intro
        setTimeout(() => this.robocillo.state.set(RobocilloStateIntro.id), 1500);

        // Input subscriptions
        this.canvas.addEventListener('keydown', (event) => {
            console.log('aki keydown', event.code, event.code);
            const inc = event.altKey ? (event.ctrlKey ? 0.0001 : 0.001) : 0.01;
            // const obj = this.earth;
            // const obj = this.sun;
            const obj = this.robocillo;
            const robocilloPhysics = this.robocillo.modifier.get<ActorSimplePhysics>(ActorSimplePhysics.id);
            if (event.code === 'Space') {
                if (this.actions.isPlaying('gravity')) {
                    this.actions.stop('gravity');
                } else {
                    robocilloPhysics.applyForce(new Vector3(0, 0, 0.01));
                    this.actions.play('gravity');
                }
            }
            if (event.code === 'Numpad4' || event.code === 'ArrowLeft') {
                obj.incZ(inc);
                const leftVector = Vector3.Cross(this.earth.getPosition().subtract(this.robocillo.getPosition()), new Vector3(1, 0, 0)).normalize();
                robocilloPhysics.applyForce(leftVector.scale(0.001));
                // console.log('aki position:', obj.getX(), obj.getY(), obj.getZ(), obj.getScale());
            }
            if (event.code === 'Numpad6' || event.code === 'ArrowRight') {
                obj.incZ(-inc);
                const rightVector = Vector3.Cross(this.earth.getPosition().subtract(this.robocillo.getPosition()), new Vector3(1, 0, 0)).negate().normalize();
                robocilloPhysics.applyForce(rightVector.scale(0.001));
                // console.log('aki position:', obj.getX(), obj.getY(), obj.getZ(), obj.getScale());
            }
            if (event.code === 'Numpad8' || event.code === 'ArrowUp') {
                obj.incY(inc);
                console.log('aki position:', obj.getX(), obj.getY(), obj.getZ(), obj.getScale());
            }
            if (event.code === 'Numpad2' || event.code === 'ArrowDown') {
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
            if (event.code === 'Digit1') {
                this.robocillo.setAnimation(RobocilloAnimations.STOP_SIDE, false);
            }
            if (event.code === 'Digit2') {
                this.robocillo.setAnimation(RobocilloAnimations.PAPER_TAKE, false);
            }
            if (event.code === 'Digit3') {
                this.robocillo.setAnimation(RobocilloAnimations.PAPER_CHECK);
            }
            if (event.code === 'Digit4') {
                this.robocillo.setAnimation(RobocilloAnimations.PAPER_THROW, false);
            }
            if (event.code === 'Digit5') {
                this.robocillo.setAnimation(RobocilloAnimations.SIDE_TO_FRONT, false);
            }
            if (event.code === 'Digit6') {
                this.robocillo.setAnimation(RobocilloAnimations.FRONT_TO_SIDE, false);
            }
            if (event.code === 'Digit7') {
                this.robocillo.setAnimation(RobocilloAnimations.STOP_FRONT, false);
            }
            if (event.code === 'Digit8') {
                this.robocillo.setAnimation(RobocilloAnimations.WALK);
            }
            if (event.code === 'Digit9') {
                this.robocillo.setAnimation(RobocilloAnimations.MOVE_HANDS);
            }
            if (event.code === 'Digit0') {
                this.robocillo.setAnimation(RobocilloAnimations.RAISE_HANDS);
            }
            if (event.code === 'Minus') {
                this.robocillo.setAnimation(RobocilloAnimations.JUMP_FRONT, false);
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
            this.coreSubscriptions.loopUpdate$.subscribe((delta) => {
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
