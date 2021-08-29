import { Scene as BabylonJsScene } from '@babylonjs/core/scene';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';

import { StateMachine } from '../state-machine/state-machine';
import { DisplayObject } from '../../models/display-object';
import { ActorProperties } from './actor-properties';
import { ActionsManager } from '../actions/actions-manager';
import { ModifiersManager } from '../modifiers/modifiers-manager';
import { ActorAnimation2D } from './actor-animation-2d';
import { ActorAnimation3D } from './actor-animation-3d';
import { Misc } from '../misc/misc';
import { ActorSimplePhysics } from '../physics/simple-physics/actor-simple-physics';
import { SpriteKeyFrameCallback } from '../sprite/sprite-keyframe-callback';

export abstract class Actor {
    // Private / Protected
    private displayObject: DisplayObject;
    protected readonly animations: Misc.KeyValue<string, ActorAnimation2D | ActorAnimation3D> = new Misc.KeyValue<
        string,
        ActorAnimation2D | ActorAnimation3D
    >();

    // Public
    readonly state: StateMachine<Actor> = new StateMachine<Actor>();
    readonly action: ActionsManager<Actor> = new ActionsManager<Actor>();
    readonly modifier: ModifiersManager = new ModifiersManager();
    readonly physics: ActorSimplePhysics;

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
     * Adds an animation to the list.
     *
     * @param name
     * @param properties
     */
    addAnimation(name: string, properties: ActorAnimation2D | ActorAnimation3D): void {
        this.animations.add(name, properties);
    }

    /**
     * Gets animation properties
     * @param id
     * @returns
     */
    getAnimation<T = ActorAnimation2D | ActorAnimation3D>(id: string): T {
        return this.animations.get<T>(id);
    }

    /**
     * Sets animation.
     * To be implemented by generic actors (Actor2D, Actor3D,..).
     *
     * @param name
     * @param loop
     * @param completed
     */
    abstract setAnimation(name: string, loop?: boolean, completed?: () => void, keyFrames?: SpriteKeyFrameCallback): void;

    /**
     * To be implemented by app actor.
     * It will be invoked after scene loading.
     */
    abstract initialize(): void;

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
