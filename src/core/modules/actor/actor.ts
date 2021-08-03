import { Scene as BabylonJsScene } from '@babylonjs/core/scene';

import { StateMachine } from '../state-machine/state-machine';
import { DisplayObject } from '../../models/display-object';
import { ActorProperties } from './actor-properties';
import { ActorActionsManager } from '../actor-actions/actor-actions-manager';

export abstract class Actor {
    private displayObject: DisplayObject;

    state: StateMachine<Actor> = new StateMachine<Actor>();
    action: ActorActionsManager<Actor> = new ActorActionsManager<Actor>();

    constructor(readonly name: string, protected readonly properties?: ActorProperties) {}

    /**
     * To be implemented by app actor.
     * Invoked on getDisplayObject from scene loading.
     * @param babylonJsScene
     */
    protected abstract createDisplayObject(babylonJsScene: BabylonJsScene): DisplayObject;

    /**
     * To be implemented by generic actors (Actor2D, Actor3D,..).
     * @param displayObject
     */
    protected abstract setDisplayObject(displayObject: DisplayObject): void;

    /**
     * To be implemented by app actor.
     * It will be invoked after scene loading.
     */
    abstract initialize(): void;

    /**
     * Retrieves display object instance (not Mesh or Sprite).
     * To be used on scene loading.
     * Mesh or Sprite instances retrieving is implemented by generic actors (Actor2D, Actor3D,..).
     * @param babylonJsScene
     * @returns
     */
    getDisplayObject(babylonJsScene: BabylonJsScene): DisplayObject {
        if (!this.displayObject) {
            this.displayObject = this.createDisplayObject(babylonJsScene);
            this.setDisplayObject(this.displayObject);
        }
        return this.displayObject;
    }

    // ----------------------------
    //  Operators
    // ----------------------------

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

    setScale(scale: number): void {
        this.displayObject.setScale(scale);
    }

    getScale(): number {
        return this.displayObject.getScale();
    }
}
