import { Scene as BabylonSceneJs } from '@babylonjs/core/scene';

import { Actor2D, Sprite } from '../../../../../core/index';
import { IRobocilloActionGoTo, RobocilloActionGoTo } from './robocillo-action-goto';
import { SimplePhysics } from '../../../../../core/modules/physics/simple-physics';

export enum RobocilloActorActions {
    GOTO = 'goto',
}

export class RobocilloActor extends Actor2D {
    simplePhysics: SimplePhysics;

    createDisplayObject(babylonJsScene: BabylonSceneJs): Sprite {
        return new Sprite(this.name, { url: './assets/scene-loading/sprites/robocillo.png', width: 34, height: 34, numFrames: 32 });
    }

    initialize(): void {
        this.action.registerAction(new RobocilloActionGoTo(RobocilloActorActions.GOTO, this, this.properties.loopUpdate$));
        this.modifier.add(new SimplePhysics(this, this.properties.loopUpdate$));

        this.setScale(0.17);
        this.setX(-0.01);
        this.setY(0.5);
        this.setZ(0.0);
        this.sprite.play(50, true);

        this.action.play<IRobocilloActionGoTo>('goto', { x: 0 });
    }
}
