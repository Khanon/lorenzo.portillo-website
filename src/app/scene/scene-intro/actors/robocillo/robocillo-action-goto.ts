import { Subscription } from 'rxjs';

import { Vector3 } from '@babylonjs/core/Maths/math.vector';

import { Action, Actor2D, Misc } from '../../../../../khanon3d';

import { SceneIntroShared } from '../../scene-intro-shared';
import { RobocilloAnimations, RobocilloKeyFrames } from './robocillo-animations';

export interface IRobocilloActionGoTo {
    angle: number;
}

export class RobocilloActionGoTo extends Action<Actor2D, IRobocilloActionGoTo> {
    static id: string = 'RobocilloActionGoTo';

    private vDirection: Vector3;
    private gotoAngle: number;

    onPlay() {
        this.gotoAngle = this.properties.angle;

        if (this.gotoAngle < this.getEarthAngle()) {
            this.vDirection = Vector3.Cross(SceneIntroShared.earth.getPosition().subtract(this.subject.getPosition()), new Vector3(1, 0, 0))
                .negate()
                .normalize();
        } else {
            this.vDirection = Vector3.Cross(SceneIntroShared.earth.getPosition().subtract(this.subject.getPosition()), new Vector3(1, 0, 0)).normalize();
        }
        this.subject.setAnimation(RobocilloAnimations.WALK);

        this.subscribeLoopUpdate();
    }

    onStop() {
        this.subject.physics.scaleVelocity(0.2);
        this.subject.setAnimation(RobocilloAnimations.STOP_SIDE, false);
        this.unSubscribeLoopUpdate();
    }

    getEarthAngle(): number {
        const vToCenter = SceneIntroShared.earth.getPosition().subtract(this.subject.getPosition());
        return Misc.Vectors.angleXBetweenLines(new Vector3(0, -1, 0), vToCenter);
    }

    loopUpdate(delta: number): void {
        this.subject.physics.applyForce(this.vDirection.scale(0.0001));
        if (Math.abs(this.getEarthAngle() - this.gotoAngle) < 0.01) {
            this.done();
            this.stop();
        }
    }
}
