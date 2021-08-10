import { Misc } from '../../../../core';
import { Action } from '../../../../core/modules/actions/action';
import { Actor } from '../../../../core/modules/actor/actor';
import { SimplePhysics } from '../../../../core/modules/physics/simple-physics';

declare type ActorMovement = { actor: Actor; simpleMovement: SimplePhysics };

export class SceneIntroActionGravity extends Action<Actor, void> {
    private GRAVITY_POWER: number = 0.001;
    private FLOOR_LENGTH: number = 7.42;

    private readonly actorsMovement: ActorMovement[] = [];

    onPlay(): void {
        this.subscribeLoopUpdate();
    }

    onStop(): void {
        this.unSubscribeLoopUpdate();
        this.actorsMovement.forEach((actorMovement) => {
            //8a8f eliminar
            actorMovement.simpleMovement.reset();
        });
    }

    addActor(actor: Actor) {
        this.actorsMovement.push({ actor, simpleMovement: actor.modifier.get(SimplePhysics.id) });
    }

    loopUpdate(delta: number): void {
        this.actorsMovement.forEach((actorMovement) => {
            const vToCenter = this.target.getPosition().subtract(actorMovement.actor.getPosition());
            const simpleMovement = actorMovement.simpleMovement;
            if (vToCenter.length() > this.FLOOR_LENGTH) {
                // Apply gravity
                vToCenter.normalize();
                simpleMovement.applyForce(vToCenter.scale(delta * this.GRAVITY_POWER));
            } else {
                // Restitution on floor contact
                const oppositeForce = Misc.Vectors.vectorialProjectionToLine(simpleMovement.velocity, vToCenter).negate();
                actorMovement.actor.setPosition(this.target.getPosition().add(vToCenter.negate().normalize().scale(this.FLOOR_LENGTH)));
                simpleMovement.applyForce(oppositeForce.scale(1.5));
            }
        });
    }
}
