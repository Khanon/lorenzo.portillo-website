import { Scene as BabylonJsScene } from '@babylonjs/core/scene';

import { StateMachine } from '../state-machine/state-machine';
import { DisplayObject } from '../../models/display-object';
import { ActorProperties } from './actor-properties';

export abstract class Actor {
    state: StateMachine<Actor> = new StateMachine<Actor>();
    private displayObject: DisplayObject;

    constructor(readonly name: string, protected readonly properties?: ActorProperties) {}

    protected abstract createDisplayObject(babylonJsScene: BabylonJsScene): DisplayObject;
    protected abstract setChildDisplayObject(displayObject: DisplayObject): void;
    abstract initialize(): void;

    getDisplayObject(babylonJsScene: BabylonJsScene): DisplayObject {
        if (!this.displayObject) {
            this.displayObject = this.createDisplayObject(babylonJsScene);
            this.setChildDisplayObject(this.displayObject);
        }
        return this.displayObject;
    }

    setX(value: number): void {
        this.displayObject.babylonjs.position.x = value;
    }

    incX(value: number): void {
        this.displayObject.babylonjs.position.x += value;
    }

    getX(): number {
        return this.displayObject.babylonjs.position.x;
    }

    setY(value: number): void {
        this.displayObject.babylonjs.position.y = value;
    }

    incY(value: number): void {
        this.displayObject.babylonjs.position.y += value;
    }

    getY(): number {
        return this.displayObject.babylonjs.position.y;
    }

    setZ(value: number): void {
        this.displayObject.babylonjs.position.z = value;
    }

    incZ(value: number): void {
        this.displayObject.babylonjs.position.z += value;
    }

    getZ(): number {
        return this.displayObject.babylonjs.position.z;
    }

    setScale(scale: number): void {
        this.displayObject.setScale(scale);
    }

    getScale(): number {
        return this.displayObject.getScale();
    }
}
