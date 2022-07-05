import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Scene as BabylonJsScene } from '@babylonjs/core/scene';
import { Actor2D, AssetsManager, Sprite } from '@khanonjs/engine';
import { SceneIntroMessages } from '../../scene-intro-notifications';
export declare class RobocilloActor extends Actor2D {
    static paramsRatio0Pos: Vector3;
    static paramsRatio1Pos: Vector3;
    private loadingChatsTx;
    private readonly loadingChats;
    private floorContactTexture;
    createDisplayObject(babylonJsScene: BabylonJsScene): Sprite;
    onInitialize(assetsManager: AssetsManager): void;
    onRelease(): void;
    notify(id: SceneIntroMessages): void;
    particleDust(): void;
}
