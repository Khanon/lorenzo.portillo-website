import { SpriteManager } from '@babylonjs/core/Sprites/spriteManager';
import { Scene as BabylonJsScene } from '@babylonjs/core/scene';

/**
 * Class based on BabylonJs SpriteManager
 * TODO: Switch SpriteManager by SpritePackedManager once BabylonJs team implement all missing features
 */
export class SpriteTexture {
    private readonly MAX_SPRITES_PER_INSTANCE = 255;

    babylonjs: SpriteManager;

    constructor(private readonly babylonJsScene: BabylonJsScene, readonly url: string, readonly width: number, readonly height: number) {
        this.babylonjs = new SpriteManager(url, url, this.MAX_SPRITES_PER_INSTANCE, { width, height }, this.babylonJsScene);
    }

    release(): void {
        this.babylonjs.dispose();
        this.babylonjs = null;
    }
}
