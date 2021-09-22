import { Subject } from 'rxjs';

import { Vector3 } from '@babylonjs/core/Maths/math.vector';

import { Action, Actor, Misc } from '../../../../khanon3d';

import { SceneIntroShared } from './../scene-intro-shared';

export class SceneIntroActionGravity extends Action<Actor, void> {
    private readonly GRAVITY_POWER: number = 0.00023;
    private readonly FLOOR_LENGTH: number = 7.42;
    private readonly HORIZONTAL_DECREASE_FACTOR = 0.01;
    private readonly RESTITUTION_OVER_FACTOR = 0.01;

    private readonly actors: Misc.KeyValue<Actor, null> = new Misc.KeyValue<Actor, null>();

    private floorContact$: Subject<number> = new Subject<number>();

    onPlay(): void {
        this.subscribeLoopUpdate();
    }

    onStop(): void {
        this.unSubscribeLoopUpdate();
    }

    addActor(actor: Actor) {
        this.actors.add(actor, null);
    }

    getFloorContactObserbable(): Subject<number> {
        return this.floorContact$;
    }

    loopUpdate(delta: number): void {
        this.actors.getKeys().forEach((actor) => {
            const vToCenter = SceneIntroShared.earth.getPosition().subtract(actor.physics.getTranslation());
            const hSlowDownVector = Misc.Vectors.vectorialProjectionToPlane(actor.physics.getVelocity(), vToCenter).negate();

            // Horizontal slow down factor
            if (hSlowDownVector.length() > Misc.Maths.MIN_VALUE) {
                actor.physics.applyForce(hSlowDownVector.scale(this.HORIZONTAL_DECREASE_FACTOR));
            }

            // Gravity factor
            if (vToCenter.length() > this.FLOOR_LENGTH + Misc.Maths.MIN_VALUE) {
                // Apply gravity
                actor.physics.onFloor = false;
                vToCenter.normalize();
                actor.physics.applyForce(vToCenter.scale(this.GRAVITY_POWER));
            } else {
                // Floor contact
                actor.physics.onFloor = true;
                actor.physics.setTranslation(SceneIntroShared.earth.getPosition().add(vToCenter.negate().normalize().scale(this.FLOOR_LENGTH)));

                // Restitution on floor contact
                const restitutionVector = Misc.Vectors.vectorialProjectionToLine(actor.physics.getVelocity(), vToCenter).negate();
                const restitutionVectorLength = restitutionVector.length();

                if (restitutionVectorLength > this.RESTITUTION_OVER_FACTOR) {
                    // 8a8f Solve the problem of huge jump after un-focusing the webpage selecting another tab on browser
                    actor.physics.applyForce(restitutionVector.scale(1.5));
                    this.floorContact$.next(restitutionVectorLength);
                }
            }

            // Rotate the actor according to angle with earth center
            const earthAngle = Misc.Vectors.angleXBetweenLines(new Vector3(0, -1, 0), vToCenter);
            actor.physics.setRotationFromFloats(earthAngle, 0, 0);
        });
    }
}
