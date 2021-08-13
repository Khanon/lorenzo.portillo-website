import { Misc } from '../../../../core';
import { Action } from '../../../../core/modules/actions/action';
import { Actor } from '../../../../core/modules/actor/actor';
import { SimpleActorPhysics } from '../../../../core/modules/physics/simple-actor-physics';

declare type ActorMovement = { actor: Actor; simplePhysics: SimpleActorPhysics };

export class SceneIntroActionGravity extends Action<Actor, void> {
    private readonly GRAVITY_POWER: number = 0.001;
    private readonly FLOOR_LENGTH: number = 7.42;
    private readonly HORIZONTAL_DECREASE_FACTOR = 0.05;
    private readonly RESTITUTION_OVER_FACTOR = 0.01;

    private readonly actorsMovement: ActorMovement[] = [];

    onPlay(): void {
        this.subscribeLoopUpdate();
    }

    onStop(): void {
        this.unSubscribeLoopUpdate();
        this.actorsMovement.forEach((actorMovement) => {
            //8a8f eliminar
            actorMovement.simplePhysics.reset();
        });
    }

    addActor(actor: Actor) {
        this.actorsMovement.push({ actor, simplePhysics: actor.modifier.get(SimpleActorPhysics.id) });
    }

    loopUpdate(delta: number): void {
        this.actorsMovement.forEach((actorMovement) => {
            const vToCenter = this.target.getPosition().subtract(actorMovement.actor.getPosition());
            const simplePhysics = actorMovement.simplePhysics;
            const hSlowDownVector = Misc.Vectors.vectorialProjectionToPlane(simplePhysics.velocity, vToCenter).negate();

            // Slow down factor
            simplePhysics.applyForce(hSlowDownVector.scale(delta * this.HORIZONTAL_DECREASE_FACTOR));
            if (vToCenter.length() > this.FLOOR_LENGTH + Misc.Maths.MIN_VALUE) {
                // Apply gravity
                vToCenter.normalize();
                simplePhysics.applyForce(vToCenter.scale(delta * this.GRAVITY_POWER));
            } else {
                // Floor contact
                simplePhysics.setTranslation(this.target.getPosition().add(vToCenter.negate().normalize().scale(this.FLOOR_LENGTH)));

                // Restitution on floor contact
                const restitutionVector = Misc.Vectors.vectorialProjectionToLine(simplePhysics.velocity, vToCenter).negate();
                if (restitutionVector.length() > this.RESTITUTION_OVER_FACTOR) {
                    simplePhysics.applyForce(restitutionVector.scale(1.5));
                }
            }
        });
    }
}
