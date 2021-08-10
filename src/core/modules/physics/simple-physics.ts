import { Observable } from 'rxjs';

import { Vector3 } from '@babylonjs/core/Maths/math.vector';

import { Modifier } from '../modifiers/modifier';
import { LoopUpdateable } from '../../models/loop-updateable';
import { Actor } from '../actor/actor';

// 8a8f intentar hacer esto con decorador, sacar el subject loopUpdate de core a un static para no tener que pasarlo por toda la aplicación
// https://cloudsoft.io/blog/level-up-your-typescript-game

/*function Init(args: any) {
    return <T extends { new (...args: any[]): {} }>(constructor: T) => {
        return class extends constructor {
            fuel = args.fuel || 0;
        };
    };
}*/

// @Init(this)
export class SimplePhysics extends LoopUpdateable implements Modifier {
    id: string = 'simple-physics';

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
