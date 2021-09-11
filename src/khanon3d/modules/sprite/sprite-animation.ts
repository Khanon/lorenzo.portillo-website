import { AnimationBase } from '../../models/animation-base';

export interface SpriteAnimation extends AnimationBase {
    delay: number;
    loop: boolean;
    frameStart?: number;
    frameEnd?: number;
}
