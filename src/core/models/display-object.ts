import { Mesh as BabylonJsMesh } from '@babylonjs/core/Meshes/mesh';
import { Sprite as BabylonJsSprite } from '@babylonjs/core/Sprites/sprite';

export abstract class DisplayObject {
    readonly babylonjs: BabylonJsSprite | BabylonJsMesh;
    visible: boolean;

    abstract setScale(scale: number): void;
    abstract getScale(): number;
}
