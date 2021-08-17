import { Scene as BabylonSceneJs } from '@babylonjs/core/scene';

import { Actor2D, Sprite } from '../../../../../core/index';
import { RobocilloActionGoTo } from './robocillo-action-goto';
import { ActorSimplePhysics } from '../../../../../core/modules/physics/actor-simple-physics';

export enum RobocilloActions {
    GOTO = 'goto',
}

export enum RobocilloAnimations {
    STOP_SIDE = 'stop_side',
    PAPER_TAKE = 'paper_take',
    PAPER_CHECK = 'paper_check',
    PAPER_THROW = 'paper_throw',
    SIDE_TO_FRONT = 'side_to_front',
    FRONT_TO_SIDE = 'front_to_side',
    STOP_FRONT = 'stop_front',
    WALK = 'walk',
    MOVE_HANDS = 'move_hands',
    RAISE_HANDS = 'raise_hands',
    JUMP_FRONT = 'jump_front',
}

export class RobocilloActor extends Actor2D {
    createDisplayObject(babylonJsScene: BabylonSceneJs): Sprite {
        return new Sprite(this.name, { url: './assets/scene-intro/sprites/robocillo.png', width: 34, height: 34, numFrames: 32 });
    }

    initialize(): void {
        const physics = this.modifier.add<ActorSimplePhysics>(new ActorSimplePhysics(this, this.properties.loopUpdate$));
        this.action.registerAction(new RobocilloActionGoTo(RobocilloActions.GOTO, this, this.properties.loopUpdate$));

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
        // physics.setTranslationFromFloat(-0.01, -0.32, -2.96);
        physics.setTranslationFromFloat(-0.01, 0.5, 0.0); // 8a8f test
        this.setAnimation(RobocilloAnimations.WALK);
    }
}
