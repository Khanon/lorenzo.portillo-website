import { Scene as BabylonJsScene } from '@babylonjs/core/scene';
import { Actor3D, Mesh } from '@khanonjs/engine';
export declare class EarthActor extends Actor3D {
    createDisplayObject(babylonJsScene: BabylonJsScene): Mesh;
    onInitialize(): void;
    onRelease(): void;
}
