import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Misc } from '../../../../core';
import { Action } from '../../../../core/modules/actions/action';
import { Actor } from '../../../../core/modules/actor/actor';
import { ActorSimplePhysics } from '../../../../core/modules/physics/actor-simple-physics';
import { Actor2D } from '../../../../core/modules/actor/actor2d';

export class SceneIntroActionGravity extends Action<Actor, void> {
    private readonly GRAVITY_POWER: number = 0.001;
    private readonly FLOOR_LENGTH: number = 7.42;
    private readonly HORIZONTAL_DECREASE_FACTOR = 0.05;
    private readonly RESTITUTION_OVER_FACTOR = 0.01;

    private readonly actorsMovement: Misc.KeyValue<Actor, ActorSimplePhysics> = new Misc.KeyValue<Actor, ActorSimplePhysics>();

    onPlay(): void {
        console.log('aki gravity onPlay');
        this.subscribeLoopUpdate();
    }

    onStop(): void {
        this.unSubscribeLoopUpdate();
        this.actorsMovement.getValues().forEach((physics) => {
            physics.reset();
        });
    }

    addActor(actor: Actor) {
        this.actorsMovement.add(actor, actor.modifier.get(ActorSimplePhysics.id));
    }

    loopUpdate(delta: number): void {
        this.actorsMovement.getPairs().forEach((actorMovement) => {
            const actor = actorMovement.key as Actor2D;
            const physics = actorMovement.value;
            const vToCenter = this.target.getPosition().subtract(actor.getPosition());
            const hSlowDownVector = Misc.Vectors.vectorialProjectionToPlane(physics.getVelocity(), vToCenter).negate();

            // Horizontal slow down factor
            if (hSlowDownVector.length() > Misc.Maths.MIN_VALUE) {
                physics.applyForce(hSlowDownVector.scale(delta * this.HORIZONTAL_DECREASE_FACTOR));
            }

            // Gravity factor
            if (vToCenter.length() > this.FLOOR_LENGTH + Misc.Maths.MIN_VALUE) {
                // Apply gravity
                vToCenter.normalize();
                physics.applyForce(vToCenter.scale(delta * this.GRAVITY_POWER));
            } else {
                // Floor contact
                physics.setTranslation(this.target.getPosition().add(vToCenter.negate().normalize().scale(this.FLOOR_LENGTH)));

                // Restitution on floor contact
                const restitutionVector = Misc.Vectors.vectorialProjectionToLine(physics.getVelocity(), vToCenter).negate();
                if (restitutionVector.length() > this.RESTITUTION_OVER_FACTOR) {
                    physics.applyForce(restitutionVector.scale(1.5));
                }
            }

            // Rotate the actor according to angle with earth center
            const angleToCenter = Misc.Vectors.angleXBetweenLines(new Vector3(0, -1, 0), vToCenter);
            physics.setRotationFromFloats(angleToCenter, 0, 0);
        });
    }
}
