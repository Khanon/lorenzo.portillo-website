import { Sprite as BabylonJsSprite } from '@babylonjs/core/Sprites/sprite';

import { SpriteInstance } from './sprite-instance';
import { SpriteProperties } from './sprite-properties';

/**
 * Class based on BabylonJs SpriteManager
 * TODO: Switch SpriteManager by SpritePackedManager once BabylonJs team implement all missing features // 8a8f
 */

export class Sprite {
    readonly babylonjs: BabylonJsSprite;

    constructor(private readonly spriteInstance: SpriteInstance, private readonly properties: SpriteProperties) {
        this.babylonjs = new BabylonJsSprite('', this.spriteInstance.babylonjs);
        this.babylonjs.width = 1;
        this.properties.ratio = this.properties.ratio ?? this.properties.height / this.properties.width;
        this.babylonjs.height = this.properties.ratio;
        this.visible = false;
    }

    get visible(): boolean {
        return this.babylonjs.isVisible;
    }
    set visible(visible: boolean) {
        this.babylonjs.isVisible = visible;
    }

    play(delay: number, loop: boolean, frameStart: number = 0, frameEnd: number = this.properties.numFrames - 1): void {
        this.visible = true;
        this.babylonjs.playAnimation(frameStart, frameEnd, loop, delay);
    }

    stop(): void {
        this.babylonjs.stopAnimation();
    }

    setFrame(frame: number): void {
        this.visible = true;
        this.babylonjs.cellIndex = frame;
    }
}