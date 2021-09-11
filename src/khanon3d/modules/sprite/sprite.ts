import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Sprite as BabylonJsSprite } from '@babylonjs/core/Sprites/sprite';

import { DisplayObject } from '../../models/display-object';
import { SpriteInstance } from './sprite-instance';
import { SpriteProperties } from './sprite-properties';
import { Logger } from '../logger/logger';
import { SpriteAnimation } from './sprite-animation';

/**
 * Class based on BabylonJs SpriteManager
 * TODO: Switch SpriteManager by SpritePackedManager once BabylonJs team implement all missing features
 */

export class Sprite extends DisplayObject {
    babylonjs: BabylonJsSprite;
    private spriteInstance: SpriteInstance;

    private scale: number = 1;
    private keyFramesTimeouts: NodeJS.Timeout[] = [];

    constructor(readonly name: string, readonly properties: SpriteProperties) {
        super(name);
    }

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

    /**
     * Play an animation
     *
     * @param animation
     * @param loopOverride Override 'loop' value on animation interface
     * @param completed
     */
    play(animation: SpriteAnimation, loopOverride?: boolean, completed?: () => void): void {
        const loop = loopOverride ?? animation.loop;
        const frameStart = animation.frameStart ?? 0;
        const frameEnd = animation.frameEnd ?? this.properties.numFrames - 1;

        const playAnimation = () => {
            this.babylonjs.playAnimation(frameStart, frameEnd, false, animation.delay, completed || loop ? onCompleted : undefined);
            setKeyframesTimeouts();
        };

        // Emit on subject for each keyFrame timeout    // 8a8f optimizar esto
        const setKeyframesTimeouts = () => {
            this.keyFramesTimeouts = [];
            if (animation.keyFrames) {
                animation.keyFrames.forEach((animationKeyFrame) => {
                    animationKeyFrame.keyFrames.forEach((frame) => {
                        if (frame >= frameStart && frame <= frameEnd) {
                            const timeout = setTimeout(() => animationKeyFrame.subject.next(frame), (frame - frameStart) * animation.delay);
                            this.keyFramesTimeouts.push(timeout);
                        } else {
                            Logger.error(`Keyframe out of bounds. Frame: ${frame}, Frame start: ${frameStart}, Sprite: ${this.name}`);
                        }
                    });
                });
            }
        };

        // To support 'keyframes' and 'completed' callback for each loop tt is neccesary to do the loop manually since BabylonJs only notify the first end of animation
        // Otherwise would need to use setInterval for keyframes, which would't be synchronized after some loops
        const onCompleted = () => {
            if (completed) {
                completed();
            }
            if (loop) {
                playAnimation();
            }
        };

        this.visible = true;
        this.removeAnimationKeyFrames();
        playAnimation();
    }

    stop(): void {
        this.removeAnimationKeyFrames();
        this.babylonjs.stopAnimation();
    }

    setFrame(frame: number): void {
        this.stop();
        this.visible = true;
        if (frame < 0) {
            frame = this.properties.numFrames - 1;
        }
        this.babylonjs.cellIndex = frame;
    }

    /**
     * Since sprites are always facing camera, the only rotation allowed is on x axis
     *
     * @param rotation
     */
    setRotation(rotation: Vector3): void {
        this.babylonjs.angle = rotation.x;
    }

    getRotation(): Vector3 {
        return new Vector3(this.babylonjs.angle, 0, 0);
    }

    setScale(scale: number): void {
        this.scale = scale;
        this.babylonjs.width = this.scale;
        this.babylonjs.height = this.properties.ratio * this.scale;
    }

    getScale(): number {
        return this.scale;
    }

    private removeAnimationKeyFrames(): void {
        this.keyFramesTimeouts.forEach((timeout) => clearTimeout(timeout));
        this.keyFramesTimeouts = [];
    }
}
