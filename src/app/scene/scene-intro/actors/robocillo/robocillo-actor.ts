import { merge } from 'rxjs';

import { Scene as BabylonJsScene } from '@babylonjs/core/scene';

import { Actor2D, Sprite, ParticleSprite, ParticleEndCriteria } from '../../../../../khanon3d';

import { RobocilloActionGoTo } from './robocillo-action-goto';
import { RobocilloStateIntro } from './robocillo-state-intro';
import { RobocilloAnimations, RobocilloKeyFrames } from './robocillo-animations';
import { SceneIntroObservables } from '../../scene-intro-observables';

export class RobocilloActor extends Actor2D {
    createDisplayObject(babylonJsScene: BabylonJsScene): Sprite {
        return new Sprite(this.name, { url: './assets/scene-intro/sprites/robocillo.png', numFrames: 32 });
    }

    initialize(): void {
        this.action.registerAction(new RobocilloActionGoTo(RobocilloActionGoTo.id, this, this.properties.loopUpdate$));
        this.state.registerState(new RobocilloStateIntro(RobocilloStateIntro.id, this));

        this.addAnimation(RobocilloAnimations.STOP_SIDE, { delay: 75, frameStart: 0, frameEnd: 0, loop: false });
        this.addAnimation(RobocilloAnimations.PAPER_TAKE, { delay: 75, frameStart: 8, frameEnd: 15, loop: false });
        this.addAnimation(RobocilloAnimations.PAPER_CHECK, { delay: 75, frameStart: 16, frameEnd: 21, loop: false });
        this.addAnimation(RobocilloAnimations.PAPER_THROW, { delay: 75, frameStart: 24, frameEnd: 27, loop: false });
        this.addAnimation(RobocilloAnimations.SIDE_TO_FRONT, { delay: 75, frameStart: 32, frameEnd: 34, loop: false });
        this.addAnimation(RobocilloAnimations.FRONT_TO_SIDE, { delay: 75, frameStart: 40, frameEnd: 42, loop: false });
        this.addAnimation(RobocilloAnimations.STOP_FRONT, { delay: 75, frameStart: 48, frameEnd: 48, loop: false });
        this.addAnimation(RobocilloAnimations.WALK, {
            delay: 75,
            frameStart: 56,
            frameEnd: 63,
            loop: true,
            keyFrames: [
                {
                    id: RobocilloKeyFrames.FLOOR_CONTACT,
                    frames: [56, 60],
                },
            ],
        });
        this.addAnimation(RobocilloAnimations.MOVE_HANDS, { delay: 75, frameStart: 64, frameEnd: 66, loop: true });
        this.addAnimation(RobocilloAnimations.RAISE_HANDS, { delay: 75, frameStart: 72, frameEnd: 74, loop: true });
        this.addAnimation(RobocilloAnimations.JUMP_FRONT, { delay: 75, frameStart: 80, frameEnd: 85, loop: false });

        this.setScale(0.82);
        this.physics.setTranslationFromFloats(-20, -48, -410);

        merge(this.sceneObservables.get(SceneIntroObservables.GRAVITY_FLOOR_CONTACT), this.keyFrameSubject(RobocilloKeyFrames.FLOOR_CONTACT)).subscribe(() => {
            this.particles.new(
                new ParticleSprite({
                    spriteProperties: { url: './assets/scene-intro/sprites/particle-walk-dust.png', numFrames: 4 },
                    spriteAnimation: { delay: 150, loop: false, frameStart: 0, frameEnd: 3 },
                    x: this.getX(),
                    y: this.getY(),
                    z: this.getZ() - 0.6,
                    scale: this.getScale(),
                    alpha: Math.random() / 2 + 0.1,
                    endCriteria: ParticleEndCriteria.ANIMATION_END,
                })
            );
        });
    }
}
