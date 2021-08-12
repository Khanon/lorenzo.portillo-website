import { Vector3 } from '@babylonjs/core/Maths/math.vector';

import { Misc } from '../../../../core';
import { Action } from '../../../../core/modules/actions/action';
import { Actor } from '../../../../core/modules/actor/actor';
import { SimpleActorPhysics } from '../../../../core/modules/physics/simple-actor-physics';

declare type ActorMovement = { actor: Actor; simplePhysics: SimpleActorPhysics };

export class SceneIntroActionGravity extends Action<Actor, void> {
    private readonly GRAVITY_POWER: number = 0.001;
    private readonly FLOOR_LENGTH: number = 7.42;
    private readonly DECREASE_FACTOR = 0.05;

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
            const simpleMovement = actorMovement.simplePhysics;
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

            // const vToCenter = this.target.getPosition().subtract(actorMovement.actor.getPosition());
            // const simplePhysics = actorMovement.simplePhysics;
            // const slowDownVector = Misc.Vectors.vectorialProjectionToPlane(simplePhysics.velocity, vToCenter).negate();

            // // Slow down factor
            // simplePhysics.applyForce(slowDownVector.scale(delta * 0.05));
            // if (vToCenter.length() > this.FLOOR_LENGTH + Misc.Maths.MIN_VALUE) {
            //     // Apply gravity
            //     vToCenter.normalize();
            //     simplePhysics.applyForce(vToCenter.scale(delta * this.GRAVITY_POWER));
            // } else {
            //     // Floor contact
            //     actorMovement.actor.setPosition(this.target.getPosition().add(vToCenter.negate().normalize().scale(this.FLOOR_LENGTH)));

            //     // Restitution on floor contact
            //     const restitutionVector = Misc.Vectors.vectorialProjectionToLine(simplePhysics.velocity, vToCenter).negate();
            //     if (restitutionVector.length() > Misc.Maths.MIN_VALUE) {
            //         console.log('aki JUMP!', restitutionVector.length(), simplePhysics.velocity.toString());
            //         simplePhysics.applyForce(restitutionVector.scale(1.5));
            //     }
            // }
        });
    }
}

// MAL
// aki JUMP! 0.02051046767117065 {X: 0.000026958885447308537 Y:-0.020569582807928102 Z:0.0032426035125380256}
// khanon3d.js:319796 aki JUMP! 0.010255683897662567 {X: -0.000013358192307517719 Y:0.01019230217496633 Z:0.003728098752824866}
// khanon3d.js:319796 aki JUMP! 0.0051273525490577124 {X: 0.000006799480579787646 Y:-0.005187980573418473 Z:0.0034090983741072614}
// khanon3d.js:319796 aki JUMP! 0.0025639338424131813 {X: -0.000003279588311419583 Y:0.00250233805641423 Z:0.0035167928618051927}
// khanon3d.js:319796 aki JUMP! 0.0012815280628923188 {X: 0.0000017590395439475374 Y:-0.0013421299346484902 Z:0.0034021413856400737}
// khanon3d.js:319796 aki JUMP! 0.0006411531750104739 {X: -7.609382742449612e-7 Y:0.0005806102983983557 Z:0.003394138909801405}
// khanon3d.js:319796 aki JUMP! 0.0003202432613991047 {X: 4.984591988361498e-7 Y:-0.0003803088028592032 Z:0.0033404246896481}
