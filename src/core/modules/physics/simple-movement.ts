import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { ActorModifierList } from '../actor/modifiers/actor-modifiers-list';
import { ActorModifier } from '../actor/modifiers/actor-modifier';

export class SimpleMovement implements ActorModifier {
    id: ActorModifierList = ActorModifierList.SimpleMovement;

    private _velocity: Vector3 = new Vector3();
    private maxVelocity: number = Number.MAX_VALUE;

    set velocity(value: Vector3) {
        this._velocity = value;
    }

    get velocity(): Vector3 {
        return this._velocity;
    }

    accelerate(acc: Vector3): void {
        this.velocity = this.velocity.add(acc);
        if (this.velocity.length() > this.maxVelocity) {
            this.velocity.normalize().scale(this.maxVelocity);
        }
    }

    setMaxVelocity(maxVelocity: number): void {
        this.maxVelocity = maxVelocity;
    }

    reset(): void {
        this.velocity.set(0, 0, 0);
    }
}
