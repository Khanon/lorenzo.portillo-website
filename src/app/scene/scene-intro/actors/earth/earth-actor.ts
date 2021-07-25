import { Actor3D } from '../../../../../core';

import { EarthStateInitialize } from './earth-state-initialize';
import { EarthStateMotion } from './earth-state-motion';

export class EarthActor extends Actor3D {
    registerStates(): void {
        this.state.registerState(new EarthStateInitialize(this));
        this.state.registerState(new EarthStateMotion(this, this.loopUpdate$));
    }
}
