import { Sprite as BabylonJsSprite } from '@babylonjs/core/Sprites/sprite';

import { SpriteInstance } from './sprite-instance';
import { SpriteProperties } from './sprite-properties';

/**
 * Class based on BabylonJs SpriteManager
 * TODO: Switch SpriteManager by SpritePackedManager once BabylonJs team implement all missing features // 8a8f
 */

export class Sprite {
    private readonly babylonjs: BabylonJsSprite;

    constructor(private readonly spriteInstance: SpriteInstance, private readonly properties: SpriteProperties) {
        this.babylonjs = new BabylonJsSprite('', spriteInstance.babylonjs);
        this.babylonjs.width = 1;
        this.babylonjs.height = properties.ratio;
        this.visible = false;
    }

    get visible(): boolean {
        return this.babylonjs.isVisible;
    }
    set visible(visible: boolean) {
        this.babylonjs.isVisible = visible;
    }

    play(delay: number, loop: boolean): void {
        this.visible = true;
        this.babylonjs.playAnimation(0, this.properties.numFrames - 1, loop, delay);
    }

    stop(): void {
        this.babylonjs.stopAnimation();
    }

    setFrame(frame: number): void {
        this.visible = true;
        this.babylonjs.cellIndex = frame;
    }
}
