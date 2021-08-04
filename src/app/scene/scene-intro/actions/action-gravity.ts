import { Misc } from '../../../../core';
import { Action } from '../../../../core/modules/actions/action';
import { Actor } from '../../../../core/modules/actor/actor';
import { ActorModifierList } from '../../../../core/modules/actor/modifiers/actor-modifiers-list';

export class SceneIntroActionGravity extends Action<Actor, void> {
    private GRAVITY_POWER: number = 0.0001;
    private FLOOR_LENGTH: number = 7.42;

    private readonly actors: Actor[] = [];

    play(): void {
        this.subscribeLoopUpdate();
    }

    stop(): void {
        this.unSubscribeLoopUpdate();
    }

    addActor(actor: Actor) {
        this.actors.push(actor);
    }

    loopUpdate(delta: number): void {
        this.actors.forEach((actor) => {
            const direction = this.target.getPosition().subtract(actor.getPosition());
            if (direction.length() > this.FLOOR_LENGTH + Misc.Maths.MIN_VALUE) {
                const simpleMovement = actor.modifier.get(ActorModifierList.SimpleMovement);

                // Apply gravity
                simpleMovement.accelerate(direction.scale(delta * this.GRAVITY_POWER));
                actor.incPosition(simpleMovement.velocity);

                console.log(simpleMovement.velocity.toString());

                // Collide with floor
                const length = this.target.getPosition().subtract(actor.getPosition()).length();
                if (length < this.FLOOR_LENGTH) {
                    // simpleMovement.accelerate(direction.negate().normalize().scale());
                    // 8a8f Aplicar la fuerza opuesta a su velocidad de caida
                    actor.setPosition(this.target.getPosition().add(direction.negate().normalize().scale(this.FLOOR_LENGTH)));
                }
            }
        });
    }
}
