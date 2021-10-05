import { Vector3 } from '@babylonjs/core';

import { Action, Actor2D } from '../../../../../khanon3d';

import { SpriteTexture } from '../../../../../khanon3d/modules/sprite/sprite-texture';
import { ParticleSprite } from '../../../../../khanon3d/modules/particle/particles/particle-sprite';
import { ParticleEndCriteria } from '../../../../../khanon3d/modules/particle/particle-end-criteria';
import { MotionSpriteBasic } from '../../../../../khanon3d/modules/motion/motions/motion-sprite-basic';
import { MotionEndCriteria } from '../../../../../khanon3d/modules/motion/motion-end-criteria';

export class RobocilloActionChat extends Action<Actor2D, void> {
    static id: string = 'RobocilloActionChat';

    txChats: SpriteTexture[];
    txEnd: SpriteTexture[];
    counter: number = 0;

    onPlay() {
        this.subject.particles.new(
            new ParticleSprite({
                spriteTexture: this.txChats[this.counter],
                x: this.subject.getX() + 10,
                y: this.subject.getY() + 12,
                z: this.subject.getZ() - 0.6,
                scale: 0.3,
                motion: new MotionSpriteBasic(
                    {
                        alphaStart: 1,
                        alphaEnd: 0,
                        alphaVel: 0.01,
                        posVel: new Vector3(0, 0.1, 0),
                        endCriteria: MotionEndCriteria.ALPHA_END,
                    },
                    this.loopUpdate$
                ),
                endCriteria: ParticleEndCriteria.MOTION_END,
            })
        );

        this.counter++;
        if (this.counter === this.txChats.length) {
            this.counter = 0;
        }

        this.stop();
    }

    onStop() {}

    setChastTextures(txChats: SpriteTexture[]): void {
        this.txChats = txChats;
    }
}
