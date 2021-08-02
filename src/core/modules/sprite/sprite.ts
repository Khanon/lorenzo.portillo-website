import { Sprite as BabylonJsSprite } from '@babylonjs/core/Sprites/sprite';

import { DisplayObject } from '../../models/display-object';
import { SpriteInstance } from './sprite-instance';
import { SpriteProperties } from './sprite-properties';

/**
 * Class based on BabylonJs SpriteManager
 * TODO: Switch SpriteManager by SpritePackedManager once BabylonJs team implement all missing features // 8a8f
 */

export class Sprite implements DisplayObject {
    babylonjs: BabylonJsSprite;
    private spriteInstance: SpriteInstance;

    private scale: number = 1;

    constructor(private readonly name, readonly properties: SpriteProperties) {}

    get visible(): boolean {
        return this.babylonjs.isVisible;
    }
    set visible(visible: boolean) {
        this.babylonjs.isVisible = visible;
    }

    assignInstance(spriteInstance: SpriteInstance): void {
        this.spriteInstance = spriteInstance;
        this.babylonjs = new BabylonJsSprite(this.name, this.spriteInstance.babylonjs);
        this.babylonjs.width = 1;
        this.properties.ratio = this.properties.ratio ?? this.properties.height / this.properties.width;
        this.babylonjs.height = this.properties.ratio;
        this.visible = false;
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
        if (frame < 0) {
            frame = this.properties.numFrames - 1;
        }
        this.babylonjs.cellIndex = frame;
    }

    setScale(scale: number): void {
        this.scale = scale;
        this.babylonjs.width = this.scale;
        this.babylonjs.height = this.properties.ratio * this.scale;
    }

    getScale(): number {
        return this.scale;
    }
}
