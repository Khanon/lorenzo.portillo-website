import { combineLatest, timer, Subject } from 'rxjs';

import { UniversalCamera } from '@babylonjs/core/Cameras/universalCamera';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';

import { Scene, Logger, WorkerTimer, CoreGlobals, MotionBasic, ParticleSprite, SpriteTexture } from '../../../khanon3d';
import * as Misc from '../../../khanon3d/misc';

import { EarthActor } from './actors/earth/earth-actor';
import { SunActor } from './actors/sun/sun-actor';
import { LogoActor } from './actors/logo/logo-actor';
import { RobocilloActor } from './actors/robocillo/robocillo-actor';
import { RobocilloAnimations } from './actors/robocillo/robocillo-animations';
import { SceneIntroActionGravity } from './actions/action-gravity';
import { SceneIntroGlobals } from './scene-intro-globals';
import { RobocilloStateIntro } from './actors/robocillo/robocillo-state-intro';
import { SunStateMotion } from './actors/sun/sun-state-motion';
import { AppSceneProperties } from '../app-scene-properties';
import { AppNotifications } from '../../app.notifications';
import { SceneIntroMessages } from './scene-intro-notifications';

export class SceneIntro extends Scene {
    static id: string = 'SceneIntro';
    id = SceneIntro.id;

    private readonly START_RATIO_CANVAS = 0.45;
    private readonly MIDDLE_RATIO_CANVAS = 2.186;
    private readonly END_RATIO_CANVAS = 3.5;
    private readonly VERTICAL_RATIO_CANVAS = 0.31;
    private readonly paramsRatio0CameraPos = new Vector3(-430, 0, 0);
    private readonly paramsRatio1CameraPos = new Vector3(-200, 58, 0);
    canvasRatio: number;

    // Scene 3D objects
    private camera: UniversalCamera;
    private light: HemisphericLight;

    // Shared instances
    sceneIntroShared: SceneIntroGlobals = new SceneIntroGlobals();

    // Actors
    earth: EarthActor;
    logo: LogoActor;
    sun: SunActor;
    robocillo: RobocilloActor;

    // Actions
    gravity: SceneIntroActionGravity;

    // Subscriptions
    worldLoaded: boolean = false;
    onWorldLoaded$: Subject<void> = new Subject<void>();

    // Textures
    private loadingEndTx: SpriteTexture[];
    private readonly loadingEndTexts: string[][] = [['READY!'], ['Tap to continue']];

    // Handlers
    private goWorldHandler: () => void;

    constructor(protected readonly properties: AppSceneProperties) {
        super(properties);
    }

    onLoad(): void {
        // Fixed camera
        this.camera = new UniversalCamera('camera', new Vector3(0, 0, 0), this.babylonjs);
        this.camera.target = new Vector3(1, 0, 0);
        this.camera.inputs.clear();
        this.camera.minZ = 0.01; // Let it go closer to the earth (reduce distance with near clipping plane)
        this.camera.attachControl(this.canvas, true);

        // Light
        this.light = new HemisphericLight('light', new Vector3(1, 0, 0), this.babylonjs);

        // Actions
        this.gravity = new SceneIntroActionGravity('gravity', null);
        this.actions.registerAction(this.gravity);

        // Textures
        this.loadingEndTx = Misc.SpriteTextures.createListFromTextBlock('', this.babylonjs, this.loadingEndTexts, SceneIntroGlobals.fontBase_40);

        // Add subscriptions
        this.subscribeCanvasResize();
    }

    onPlay(): void {
        this.canvasRatio = CoreGlobals.canvasDimensions.width / CoreGlobals.canvasDimensions.height;
        // this.textCanvasSize.text = `Canvas: ${canvasDimensions.width} x ${canvasDimensions.height} (Ratio: ${this.canvasRatio})`; // Debug TODO Eliminar

        // Add actors
        this.earth = this.actorsManager.addActor(new EarthActor('earth'));
        this.logo = this.actorsManager.addActor(new LogoActor('logo'));
        this.sun = this.actorsManager.addActor(new SunActor('sun'));
        this.robocillo = this.actorsManager.addActor(
            new RobocilloActor('robocillo', {
                usePhysics: true,
            })
        );
        this.applyCanvasRatio(true);

        // Shared actors
        SceneIntroGlobals.earth = this.earth;

        // Hide BlackScreen
        this.properties.appNotification(AppNotifications.HIDE_BLACK_SCREEN);

        // Start motions
        this.earth.state.set('motion');
        this.sun.state.set('motion');
        WorkerTimer.setTimeout(() => this.logo.state.set('motion'), 1300, this);

        // Start actions
        this.gravity.addActor(this.robocillo);

        // Start robocillo intro
        WorkerTimer.setTimeout(
            () => {
                this.actions.play('gravity');
                this.robocillo.state.set(RobocilloStateIntro.id);
            },
            2000,
            this
        );

        // World loaded
        combineLatest([timer(3000), this.onWorldLoaded$]).subscribe(() => {
            this.onWorldLoaded();
        });

        // Click to go to World after loading
        this.goWorldHandler = this.onGoWorld.bind(this);
        this.canvas.addEventListener('click', this.goWorldHandler, true);

        this.canvas.addEventListener('keydown', (event) => {
            console.log('aki keydown', event.code, event.code);
            const inc = event.altKey ? (event.ctrlKey ? 0.01 : 0.1) : 1;
            // const obj = this.earth;
            // const obj = this.sun;
            // const obj = this.logo;
            const obj = this.robocillo;
            if (event.code === 'Space') {
                /*if (this.actions.isPlaying('gravity')) {
                    this.actions.stop('gravity');
                } else {
                    this.robocillo.physics.applyForce(new Vector3(0, 0, 0.01));
                    this.actions.play('gravity');
                }*/
                this.robocillo.physics.applyForce(new Vector3(0, 0.1, 0));
                Logger.info('vel y:', this.robocillo.physics.getVelocity().y);
                Logger.info('pos y:', this.robocillo.physics.getTranslation().y);
                WorkerTimer.setInterval(
                    () => {
                        if (!this.robocillo.physics.onFloor) {
                            // Logger.info('');
                            // Logger.info('vel y:', this.robocillo.physics.getVelocity().y);
                            // Logger.info('pos y:', this.robocillo.physics.getTranslation().y);
                        }
                    },
                    0,
                    this
                );
            }
            if (event.code === 'Numpad4' || event.code === 'ArrowLeft') {
                this.camera.position.z += inc;
                console.log('aki camera:', this.camera.position.toString());

                // obj.incZ(inc);
                // const leftVector = Vector3.Cross(this.earth.getPosition().subtract(this.robocillo.getPosition()), new Vector3(1, 0, 0)).normalize();
                // this.robocillo.physics.setTranslation(this.robocillo.physics.getTranslation().add(leftVector));
                // this.robocillo.physics.applyForce(leftVector.scale(1));
                // console.log('aki position:', obj.getX(), obj.getY(), obj.getZ(), obj.getScale());
            }
            if (event.code === 'Numpad6' || event.code === 'ArrowRight') {
                this.camera.position.z -= inc;
                console.log('aki camera:', this.camera.position.toString());

                // obj.incZ(-inc);
                // const rightVector = Vector3.Cross(this.earth.getPosition().subtract(this.robocillo.getPosition()), new Vector3(1, 0, 0)).negate().normalize();
                // this.robocillo.physics.setTranslation(this.robocillo.physics.getTranslation().add(rightVector));
                // this.robocillo.physics.applyForce(rightVector.scale(1));
                // console.log('aki position:', obj.getX(), obj.getY(), obj.getZ(), obj.getScale());
            }
            if (event.code === 'Numpad8' || event.code === 'ArrowUp') {
                this.camera.position.y += inc;
                console.log('aki camera:', this.camera.position.toString());

                // obj.incY(inc);
                // console.log('aki position:', obj.getX(), obj.getY(), obj.getZ(), obj.getScale());
            }
            if (event.code === 'Numpad2' || event.code === 'ArrowDown') {
                this.camera.position.y -= inc;
                console.log('aki camera:', this.camera.position.toString());

                // obj.incY(-inc);
                // console.log('aki position:', obj.getX(), obj.getY(), obj.getZ(), obj.getScale());
            }
            if (event.code === 'Numpad9') {
                this.camera.position.x += inc;
                console.log('aki camera:', this.camera.position.toString());

                // obj.babylonjs.position.x += inc;
                // obj.setScale(obj.getScale() - inc);
                // console.log('aki position:', obj.getX(), obj.getY(), obj.getZ(), obj.getScale());
            }
            if (event.code === 'Numpad3') {
                this.camera.position.x -= inc;
                console.log('aki camera:', this.camera.position.toString());

                // obj.babylonjs.position.x -= inc;
                // obj.setScale(obj.getScale() + inc);
                // console.log('aki position:', obj.getX(), obj.getY(), obj.getZ(), obj.getScale());
            }
            if (event.code === 'End') {
            }
            if (event.code === 'Home') {
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

    onStop(): void {}

    onRelease(): void {
        this.canvas.removeEventListener('click', this.goWorldHandler, true);
        Misc.SpriteTextures.releaseList(this.loadingEndTx);
        this.releaseSubscriptions();
    }

    onError(errorMsg: string): void {
        CoreGlobals.onError$.next(errorMsg);
    }

    onGoWorld(): void {
        console.log('aki onGorWorld!!', this.worldLoaded);
        if (this.worldLoaded) {
            this.properties.appNotification(AppNotifications.GO_WORLD);
        }
    }

    subscribeCanvasResize(): void {
        this.addSubscription(
            CoreGlobals.canvasResize$.subscribe((dimensions) => {
                this.canvasRatio = dimensions.width / dimensions.height;
                this.applyCanvasRatio(false);
            })
        );
    }

    applyCanvasRatio(initialize: boolean): void {
        // Camera responsive, this.MIDDLE_RATIO_CANVAS is ratio = 0; this.END_RATIO_CANVAS is ratio = 1
        const factorCamera = 1 / (this.END_RATIO_CANVAS - this.MIDDLE_RATIO_CANVAS);
        const ratioCamera = (this.canvasRatio - this.MIDDLE_RATIO_CANVAS) * factorCamera;
        this.camera.position = Misc.Vectors.dragPoint(ratioCamera, this.paramsRatio0CameraPos, this.paramsRatio1CameraPos);

        // this.START_RATIO_CANVAS is ratio = 0; this.MIDDLE_RATIO_CANVAS is ratio = 1
        const factor = 1 / (this.MIDDLE_RATIO_CANVAS - this.START_RATIO_CANVAS);
        const ratio = (this.canvasRatio - this.START_RATIO_CANVAS) * factor;

        // Logo responsive
        if (ratio < this.VERTICAL_RATIO_CANVAS) {
            this.logo.setPosition(LogoActor.paramsRatio0Pos);
        } else {
            this.logo.setPosition(Misc.Vectors.dragPoint(ratio, LogoActor.paramsRatio0Pos, LogoActor.paramsRatio1Pos));
        }
        this.logo.setScale(Misc.Maths.dragValue(ratio, LogoActor.paramsRatio0Scale, LogoActor.paramsRatio1Scale));

        // Sun responsive
        if (initialize) {
            this.sun.setPosition(Misc.Vectors.dragPoint(ratio, SunActor.paramsRatio0Pos, SunActor.paramsRatio1Pos));
            SunStateMotion.endPosition = Misc.Vectors.dragPoint(ratio, SunStateMotion.paramsRatio0Pos, SunStateMotion.paramsRatio1Pos);
            SunStateMotion.endScale = Misc.Maths.dragValue(ratio, SunStateMotion.paramsRatio0Scale, SunStateMotion.paramsRatio1Scale);
        } else {
            const stateMotion = this.sun.state.getCurrentState();
            if (stateMotion) {
                SunStateMotion.endPosition = Misc.Vectors.dragPoint(ratio, SunStateMotion.paramsRatio0Pos, SunStateMotion.paramsRatio1Pos);
                SunStateMotion.endScale = Misc.Maths.dragValue(ratio, SunStateMotion.paramsRatio0Scale, SunStateMotion.paramsRatio1Scale);
            } else {
                this.sun.setPosition(Misc.Vectors.dragPoint(ratio, SunStateMotion.paramsRatio0Pos, SunStateMotion.paramsRatio1Pos));
                this.sun.setScale(Misc.Maths.dragValue(ratio, SunStateMotion.paramsRatio0Scale, SunStateMotion.paramsRatio1Scale));
            }
        }

        // Robocillo responsive
        if (initialize) {
            this.robocillo.physics.setTranslation(Misc.Vectors.dragPoint(ratio, RobocilloActor.paramsRatio0Pos, RobocilloActor.paramsRatio1Pos));
            RobocilloStateIntro.ANGLE_SUN = Misc.Maths.dragValue(ratio, RobocilloStateIntro.paramRatio0AngleSun, RobocilloStateIntro.paramRatio1AngleSun);
        }
    }

    onWorldLoaded(): void {
        this.worldLoaded = true;
        this.robocillo.notify(SceneIntroMessages.WORLD_LOADED);

        this.particles.new(
            new ParticleSprite({
                spriteTexture: this.loadingEndTx[0],
                x: -30,
                y: 75,
                z: 0,
                scale: 0.4,
                motion: new MotionBasic({
                    alphaStart: 0,
                    alphaEnd: 1,
                    alphaVel: 0.1,
                    posSin: new Vector3(0, 5, 0),
                    posSinVel: 0.1,
                    rotSin: new Vector3(0.05, 0, 0),
                    rotSinVel: 0.1,
                    rotSinMoment: 8,
                }),
            })
        );

        this.particles.new(
            new ParticleSprite({
                spriteTexture: this.loadingEndTx[1],
                x: -30,
                y: 60,
                z: 0,
                scale: 0.3,
                motion: new MotionBasic({
                    alphaStart: 0,
                    alphaEnd: 1,
                    alphaVel: 0.1,
                    posSin: new Vector3(0, 5, 0),
                    posSinVel: 0.1,
                    posSinMoment: 0.5,
                    rotSin: new Vector3(0.05, 0, 0),
                    rotSinVel: 0.1,
                    rotSinMoment: 3,
                }),
            })
        );
    }
}
