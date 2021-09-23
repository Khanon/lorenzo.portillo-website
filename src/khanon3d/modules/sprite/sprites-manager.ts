import * as Misc from '../misc';
import { Sprite } from './sprite';
import { AssetsManager } from '../assets-manager/assets-manager';

export class SpritesManager {
    private readonly sprites: Misc.KeyValue<Sprite, Sprite> = new Misc.KeyValue<Sprite, Sprite>();

    constructor(private readonly assetsManager: AssetsManager) {}

    addSprite(sprite: Sprite): Sprite {
        sprite.setTexture(this.assetsManager.getSpriteTexture({ url: sprite.properties.url }));
        this.sprites.add(sprite, sprite);
        return sprite;
    }

    removeSprite(sprite: Sprite): void {
        sprite.release();
        this.sprites.del(sprite);
    }

    release(): void {
        this.sprites.getValues().forEach((sprite) => sprite.release());
        this.sprites.reset();
    }
}
