import { ActorAction } from '../../../../../core';
import { Actor2D } from '../../../../../core/modules/actor/actor2d';

export interface IRobocilloActionGoTo {
    x: number;
}

export class RobocilloActionGoTo extends ActorAction<Actor2D, IRobocilloActionGoTo> {
    play() {
        console.log('aki ACTION START!!, X:', this.properties.x);
        this.subscribeLoopUpdate();
    }

    stop() {
        this.unSubscribeLoopUpdate();
    }

    loopUpdate(delta: number): void {
        console.log('aki ACTION RUN!!, X:', this.properties.x);
        // this.actor.
        // this.properties.
    }
}
