import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Scene as BabylonJsScene } from '@babylonjs/core/scene';
import { Actor2D, Sprite } from '@khanonjs/engine';
export declare class LogoActor extends Actor2D {
    static paramsRatio0Pos: Vector3;
    static paramsRatio1Pos: Vector3;
    static paramsRatio0Scale: number;
    static paramsRatio1Scale: number;
    createDisplayObject(babylonJsScene: BabylonJsScene): Sprite;
    onInitialize(): void;
    onRelease(): void;
}
