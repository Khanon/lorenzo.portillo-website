import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Action, Actor2D } from '@khanonjs/engine';
import * as Misc from '@khanonjs/engine/misc';

import { SceneIntroGlobals } from '../../scene-intro-globals';
import { RobocilloAnimations } from './robocillo-animations';

export interface IRobocilloActionGoTo {
    angle: number;
}

export class RobocilloActionGoTo extends Action<Actor2D, IRobocilloActionGoTo> {
    static id: string = 'RobocilloActionGoTo';

    private vDirection: Vector3;
    private gotoAngle: number;
    private prevDistance: number;

    onPlay() {
        this.gotoAngle = this.properties.angle;
        this.prevDistance = Number.MAX_VALUE;

        if (this.gotoAngle < this.getEarthAngle()) {
            this.vDirection = Vector3.Cross(SceneIntroGlobals.earth.getPosition().subtract(this.subject.getPosition()), new Vector3(1, 0, 0))
                .negate()
                .normalize();
        } else {
            this.vDirection = Vector3.Cross(SceneIntroGlobals.earth.getPosition().subtract(this.subject.getPosition()), new Vector3(1, 0, 0)).normalize();
        }
        this.subject.setAnimation(RobocilloAnimations.WALK);

        this.subscribeLoopUpdate();
    }

    onStop() {
        this.subject.physics.scaleVelocity(0.1);
        this.subject.setAnimation(RobocilloAnimations.STOP_SIDE, false);
        this.unSubscribeLoopUpdate();
    }

    getEarthAngle(): number {
        const vToCenter = SceneIntroGlobals.earth.getPosition().subtract(this.subject.getPosition());
        return Misc.Vectors.angleXBetweenLines(new Vector3(0, -1, 0), vToCenter);
    }

    loopUpdate(delta: number): void {
        if (Math.abs(this.getEarthAngle() - this.gotoAngle) > this.prevDistance) {
            this.done();
            this.stop();
        } else {
            this.subject.physics.applyForce(this.vDirection.scale(0.015));
            this.prevDistance = Math.abs(this.getEarthAngle() - this.gotoAngle);
        }
    }
}
