import { Actor2D } from '../../../../../core';

import { SunStateInitialize } from './sun-state-initialize';
import { SunStateMotion } from './sun-state-motion';

export class SunActor extends Actor2D {
    registerStates(): void {
        this.state.registerState(new SunStateInitialize(this));
        this.state.registerState(new SunStateMotion(this, this.loopUpdate$));
    }
}
