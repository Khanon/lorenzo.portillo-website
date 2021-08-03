import { Mesh as BabylonJsMesh } from '@babylonjs/core/Meshes/mesh';
import { Sprite as BabylonJsSprite } from '@babylonjs/core/Sprites/sprite';

export abstract class DisplayObject {
    readonly babylonjs: BabylonJsSprite | BabylonJsMesh;
    abstract visible: boolean;

    constructor(protected readonly name: string) {}

    setX(value: number): void {
        this.babylonjs.position.x = value;
    }

    incX(value: number): void {
        this.babylonjs.position.x += value;
    }

    getX(): number {
        return this.babylonjs.position.x;
    }

    setY(value: number): void {
        this.babylonjs.position.y = value;
    }

    incY(value: number): void {
        this.babylonjs.position.y += value;
    }

    getY(): number {
        return this.babylonjs.position.y;
    }

    setZ(value: number): void {
        this.babylonjs.position.z = value;
    }

    incZ(value: number): void {
        this.babylonjs.position.z += value;
    }

    getZ(): number {
        return this.babylonjs.position.z;
    }

    abstract setScale(scale: number): void;
    abstract getScale(): number;
}
