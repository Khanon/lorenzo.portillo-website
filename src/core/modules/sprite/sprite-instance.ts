import { SpriteManager } from '@babylonjs/core/Sprites/spriteManager';
import { Scene as BabylonJsScene } from '@babylonjs/core/scene';

import { SpriteProperties } from './sprite-properties';

export class SpriteInstance {
    private readonly MAX_SPRITES_PER_INSTANCE = 255;

    babylonjs: SpriteManager;

    constructor(private readonly properties: SpriteProperties, private readonly scene: BabylonJsScene) {
        this.babylonjs = new SpriteManager(
            this.properties.url,
            this.properties.url,
            this.MAX_SPRITES_PER_INSTANCE,
            ({ width: this.properties.width, height: this.properties.height } = this.properties),
            scene
        );
    }
}
