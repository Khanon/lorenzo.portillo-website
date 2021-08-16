import { Scene as BabylonSceneJs } from '@babylonjs/core/scene';

import { Actor2D, Sprite } from '../../../../../core/index';
import { IRobocilloActionGoTo, RobocilloActionGoTo } from './robocillo-action-goto';
import { ActorSimplePhysics } from '../../../../../core/modules/physics/actor-simple-physics';

export enum RobocilloActorActions {
    GOTO = 'goto',
}

export class RobocilloActor extends Actor2D {
    createDisplayObject(babylonJsScene: BabylonSceneJs): Sprite {
        return new Sprite(this.name, { url: './assets/scene-intro/sprites/robocillo.png', width: 34, height: 34, numFrames: 32 });
    }

    initialize(): void {
        this.action.registerAction(new RobocilloActionGoTo(RobocilloActorActions.GOTO, this, this.properties.loopUpdate$));
        const physics = this.modifier.add(new ActorSimplePhysics(this, this.properties.loopUpdate$)) as ActorSimplePhysics;

        this.setScale(0.17);
        // physics.setTranslationFromFloat(-0.01, -0.32, -2.96);
        physics.setTranslationFromFloat(-0.01, 0.5, 0.0); // 8a8f test
        this.sprite.play(75, true, 23, 30);

        this.action.play<IRobocilloActionGoTo>('goto', { x: 0 });
    }
}
