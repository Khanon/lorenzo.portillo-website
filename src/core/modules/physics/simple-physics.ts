import { Observable } from 'rxjs';

import { Vector3 } from '@babylonjs/core/Maths/math.vector';

import { LoopUpdateable } from '../../models/loop-updateable';
import { Actor } from '../actor/actor';
import { Modifier } from '../modifiers/modifier';

export class SimplePhysics extends LoopUpdateable implements Modifier {
    static id: string = 'simple-physics';
    id: string = SimplePhysics.id;

    private readonly SIDE_VEL_DECREASE_FACTOR = 0.05;

    private _velocity: Vector3 = new Vector3();
    private maxVelocity: number = Number.MAX_VALUE;

    constructor(private actor: Actor, protected readonly loopUpdate$?: Observable<number>) {
        super(loopUpdate$);
        this.subscribeLoopUpdate();
    }

    set velocity(value: Vector3) {
        this._velocity = value;
    }

    get velocity(): Vector3 {
        return this._velocity;
    }

    applyForce(force: Vector3): void {
        this.velocity = this.velocity.add(force);
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

    loopUpdate(delta: number): void {
        // Slow down side velocity
        this.velocity.z *= 1 - delta * this.SIDE_VEL_DECREASE_FACTOR;

        // Inc velocity to position
        this.actor.incPosition(this.velocity.scale(delta));
    }
}
