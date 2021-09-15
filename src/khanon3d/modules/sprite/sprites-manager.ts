import { Scene as BabylonJsScene } from '@babylonjs/core/scene';

import { Misc } from '../misc/misc';
import { Sprite } from './sprite';
import { SpriteInstance } from './sprite-instance';
import { SpriteProperties } from './sprite-properties';

export class SpritesManager {
    private readonly spriteInstances: Misc.KeyValue<string, SpriteInstance> = new Misc.KeyValue<string, SpriteInstance>();
    private readonly sprites: Sprite[] = [];

    constructor(private readonly babylonJsScene: BabylonJsScene) {}

    addSprite(sprite: Sprite): Sprite {
        sprite.assignInstance(this.getSpriteInstance(sprite.properties));
        this.sprites.push(sprite);
        return sprite;
    }

    removeSprite(sprite: Sprite): void {
        sprite.release();
        // TODO
    }

    release(): void {
        // TODO
    }

    /**
     * Since assets are loaded by scene, the sprite assets are stored here.
     * TODO: Maybe switching to an external manager in the future.
     *
     * @param url Returns existing instance of SpriteManager or create a new one
     * @param properties
     * @returns
     */
    getSpriteInstance(properties: SpriteProperties): SpriteInstance {
        // Search and return existing instance
        let spriteInstance: SpriteInstance = this.spriteInstances.get(properties.url);
        if (spriteInstance) {
            return spriteInstance;
        }

        // Create and return a new instance if not found
        spriteInstance = new SpriteInstance(properties, this.babylonJsScene);
        this.spriteInstances.add(properties.url, spriteInstance);
        return spriteInstance;
    }
}
