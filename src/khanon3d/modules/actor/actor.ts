import { Observable, mergeWith, Subject } from 'rxjs';

import { Scene as BabylonJsScene } from '@babylonjs/core/scene';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';

import { StateMachine } from '../state-machine/state-machine';
import { DisplayObject } from '../../models/display-object';
import { ActorProperties } from './actor-properties';
import { ActionsManager } from '../actions/actions-manager';
import { ModifiersManager } from '../modifiers/modifiers-manager';
import { SpriteAnimation } from '../sprite/sprite-animation';
import { MeshAnimation } from '../mesh/mesh-animation';
import { Misc } from '../misc/misc';
import { ActorSimplePhysics } from '../physics/simple-physics/actor-simple-physics';
import { Logger } from '../logger/logger';
import { ParticlesFactory } from '../particle/particles-factory';
import { ObservablesContainer } from '../../models/observables-container';
import { AssetsManager } from '../assets-manager/assets-manager';

export abstract class Actor {
    private displayObject: DisplayObject;
    private readonly animations: Misc.KeyValue<number, SpriteAnimation | MeshAnimation> = new Misc.KeyValue<number, SpriteAnimation | MeshAnimation>();
    private readonly keyFramesSubjects: Misc.KeyValue<number, Subject<number>> = new Misc.KeyValue<number, Subject<number>>();

    readonly state: StateMachine<Actor> = new StateMachine<Actor>();
    readonly action: ActionsManager<Actor> = new ActionsManager<Actor>();
    readonly modifier: ModifiersManager = new ModifiersManager();
    readonly physics: ActorSimplePhysics;
    protected particles: ParticlesFactory;
    protected sceneObservables: ObservablesContainer;

    constructor(readonly name: string, protected readonly properties?: ActorProperties) {
        if (this.properties?.usePhysics) {
            this.physics = new ActorSimplePhysics(this.properties.physicsUpdate$);
        }
    }

    /**
     * Invoked on getDisplayObject from scene loading.
     * To be implemented by app actor.
     *
     * @param babylonJsScene
     */
    protected abstract createDisplayObject(babylonJsScene: BabylonJsScene): DisplayObject;

    /**
     * To be implemented by generic actors (Actor2D, Actor3D,..).
     *
     * @param displayObject
     */
    protected abstract setDisplayObject(displayObject: DisplayObject): void;

    /**
     * To be implemented by app actor.
     * It will be invoked after scene loading.
     */
    abstract initialize(): void;

    /**
     * Sets animation.
     * To be implemented by generic actors (Actor2D, Actor3D,..).
     *
     * @param name
     * @param loop
     * @param completed
     */
    abstract setAnimation(id: number, loopOverride?: boolean, completed?: () => void): void;

    /**
     * Create particles manager (needs some manager from Scene)
     *
     * @param babylonJsScene
     * @param spritesManager
     * @param meshesManager
     */
    createParticlesManager(babylonJsScene: BabylonJsScene, assetsManager: AssetsManager): void {
        this.particles = new ParticlesFactory(babylonJsScene, assetsManager, this.displayObject);
    }

    /**
     * Setup scene observables
     *
     * @param sceneObservables
     */
    setSceneObservables(sceneObservables: ObservablesContainer): void {
        this.sceneObservables = sceneObservables;
    }

    /**
     * Adds an animation to the list.
     *
     * @param name
     * @param properties
     */
    addAnimation(id: number, properties: SpriteAnimation | MeshAnimation): void {
        this.animations.add(id, properties);
        if (properties.keyFrames) {
            properties.keyFrames.forEach((keyFrame) => {
                this.keyFramesSubjects.add(keyFrame.id, keyFrame.subject); // 8a8f
            });
        }
    }

    /**
     * Gets animation properties
     *
     * @param id
     * @returns
     */
    getAnimation<T = SpriteAnimation | MeshAnimation>(id: number): T {
        const animation = this.animations.get<T>(id);
        if (!animation) {
            Logger.error(`Animation not found, ID:`, id);
        }
        return animation;
    }

    // 8a8f REHACER ESTO DE LOS KEYFRAMES
    // addKeyFrame(kayframe = {keyframe id, { animations ids, frmaes[] }[] })

    /**
     * Subscribe to a keyframe event of a single animation
     *
     * @param animationId
     * @param keyFrameId
     * @returns
     */
    subscribeToKeyFrameOnSingleAnim(animationId: number, keyFrameId: number): Observable<number> {
        const animation = this.getAnimation(animationId);
        let subject: Subject<number>;
        animation.keyFrames.forEach((keyFrame) => {
            if (keyFrame.id === keyFrameId) {
                subject = keyFrame.subject;
                return;
            }
        });
        if (!subject) {
            Logger.error(`Keyframe not found. Animation ID: ${animationId}, KeyFrame ID: ${keyFrameId}`);
        }
        return subject;
    }

    /**
     * Subscribe to a keyframe event on all animations
     *
     * @param animationId
     * @param keyFrameId
     * @returns
     */
    subscribeToKeyFrameOnAllAnims(keyFrameId: number): Observable<number | Subject<number>> {
        let subjects: Subject<number>[] = [];
        this.animations.getValues().forEach((animation) => {
            if (animation.keyFrames) {
                animation.keyFrames.forEach((keyFrame) => {
                    if (keyFrame.id === keyFrameId) {
                        subjects.push(keyFrame.subject);
                        return;
                    }
                });
            }
        });
        return new Observable<number>().pipe(mergeWith(subjects));
    }

    /**
     * Emits keyframe
     *
     * @param keyFrameId
     */
    emitKeyframe(keyFrameId: number): void {
        this.keyFramesSubjects.get(keyFrameId).next(-1);
    }

    /**
     * Retrieves display object instance (not Mesh or Sprite).
     * To be used on scene loading.
     * Mesh or Sprite instances retrieving is implemented by generic actors (Actor2D, Actor3D,..).
     *
     * @param babylonJsScene
     * @returns
     */
    getDisplayObject(babylonJsScene: BabylonJsScene): DisplayObject {
        if (!this.displayObject) {
            this.displayObject = this.createDisplayObject(babylonJsScene);
            this.setDisplayObject(this.displayObject);
            if (this.physics) {
                this.physics.start(this.displayObject);
            }
        }
        return this.displayObject;
    }

    // ----------------------------
    //  Operators
    // ----------------------------

    setPosition(position: Vector3): void {
        this.displayObject.setPosition(position);
    }

    setPositionFromFloats(x: number, y: number, z: number): void {
        this.displayObject.setPositionFromFloats(x, y, z);
    }

    incPosition(position: Vector3): void {
        this.displayObject.incX(position.x);
        this.displayObject.incY(position.y);
        this.displayObject.incZ(position.z);
    }

    incPositionFromFloats(x: number, y: number, z: number): void {
        this.displayObject.incX(x);
        this.displayObject.incY(y);
        this.displayObject.incZ(z);
    }

    getPosition(): Vector3 {
        return this.displayObject.getPosition();
    }

    setX(value: number): void {
        this.displayObject.setX(value);
    }

    incX(value: number): void {
        this.displayObject.incX(value);
    }

    getX(): number {
        return this.displayObject.getX();
    }

    setY(value: number): void {
        this.displayObject.setY(value);
    }

    incY(value: number): void {
        this.displayObject.incY(value);
    }

    getY(): number {
        return this.displayObject.getY();
    }

    setZ(value: number): void {
        this.displayObject.setZ(value);
    }

    incZ(value: number): void {
        this.displayObject.incZ(value);
    }

    getZ(): number {
        return this.displayObject.getZ();
    }

    setRotation(rotation: Vector3): void {
        this.displayObject.setRotation(rotation);
    }

    getRotation(): Vector3 {
        return this.displayObject.getRotation();
    }

    setScale(scale: number): void {
        this.displayObject.setScale(scale);
    }

    getScale(): number {
        return this.displayObject.getScale();
    }
}
