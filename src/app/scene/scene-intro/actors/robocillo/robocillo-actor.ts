import { Scene as BabylonSceneJs } from '@babylonjs/core/scene';

import { Actor2D, Sprite } from '../../../../../core';

import { RobocilloActionGoTo } from './robocillo-action-goto';
import { RobocilloStateIntro } from './robocillo-state-intro';
import { RobocilloAnimations } from './robocillo-animations';

export class RobocilloActor extends Actor2D {
    createDisplayObject(babylonJsScene: BabylonSceneJs): Sprite {
        return new Sprite(this.name, { url: './assets/scene-intro/sprites/robocillo.png', width: 34, height: 34, numFrames: 32 });
    }

    initialize(): void {
        this.action.registerAction(new RobocilloActionGoTo(RobocilloActionGoTo.id, this, this.properties.loopUpdate$));
        this.state.registerState(new RobocilloStateIntro(RobocilloStateIntro.id, this));

        this.addAnimation(RobocilloAnimations.STOP_SIDE, { delay: 75, frameStart: 0, frameEnd: 0 });
        this.addAnimation(RobocilloAnimations.PAPER_TAKE, { delay: 75, frameStart: 8, frameEnd: 15 });
        this.addAnimation(RobocilloAnimations.PAPER_CHECK, { delay: 75, frameStart: 16, frameEnd: 21 });
        this.addAnimation(RobocilloAnimations.PAPER_THROW, { delay: 75, frameStart: 24, frameEnd: 27 });
        this.addAnimation(RobocilloAnimations.SIDE_TO_FRONT, { delay: 75, frameStart: 32, frameEnd: 34 });
        this.addAnimation(RobocilloAnimations.FRONT_TO_SIDE, { delay: 75, frameStart: 40, frameEnd: 42 });
        this.addAnimation(RobocilloAnimations.STOP_FRONT, { delay: 75, frameStart: 48, frameEnd: 48 });
        this.addAnimation(RobocilloAnimations.WALK, { delay: 75, frameStart: 56, frameEnd: 63 });
        this.addAnimation(RobocilloAnimations.MOVE_HANDS, { delay: 75, frameStart: 64, frameEnd: 66 });
        this.addAnimation(RobocilloAnimations.RAISE_HANDS, { delay: 75, frameStart: 72, frameEnd: 74 });
        this.addAnimation(RobocilloAnimations.JUMP_FRONT, { delay: 75, frameStart: 80, frameEnd: 85 });

        this.setScale(0.17);
        this.physics.setTranslationFromFloats(-0.01, -0.32, -2.96);
        this.setAnimation(RobocilloAnimations.STOP_FRONT);
    }
}
