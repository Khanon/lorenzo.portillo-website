import { Observable } from 'rxjs';

import { Mesh, Sprite, StateMachine } from '..';

export abstract class Actor {
    state: StateMachine<Actor> = new StateMachine<Actor>();

    constructor(readonly name: string, protected readonly displayObject: Sprite | Mesh, protected readonly loopUpdate$: Observable<number>) {
        this.registerStates();
    }

    abstract registerStates(): void;

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
