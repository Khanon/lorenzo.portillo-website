import { Scene as BabylonSceneJs } from '@babylonjs/core/scene';

import { Actor2D, Sprite } from '../../../../../core/index';
import { IRobocilloActionGoTo, RobocilloActionGoTo } from './robocillo-action-goto';
import { SimpleActorPhysics } from '../../../../../core/modules/physics/simple-actor-physics';

export enum RobocilloActorActions {
    GOTO = 'goto',
}

export class RobocilloActor extends Actor2D {
    createDisplayObject(babylonJsScene: BabylonSceneJs): Sprite {
        return new Sprite(this.name, { url: './assets/scene-intro/sprites/robocillo.png', width: 34, height: 34, numFrames: 32 });
    }

    initialize(): void {
        this.action.registerAction(new RobocilloActionGoTo(RobocilloActorActions.GOTO, this, this.properties.loopUpdate$));
        const physics = this.modifier.add(new SimpleActorPhysics(this, this.properties.loopUpdate$)) as SimpleActorPhysics;

        this.setScale(0.17);
        physics.setTranslationFromFloat(-0.01, 0.5, 0.0);
        this.sprite.play(75, true, 23, 30);

        this.action.play<IRobocilloActionGoTo>('goto', { x: 0 });
    }
}
