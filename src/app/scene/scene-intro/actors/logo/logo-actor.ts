import { Actor2D } from '../../../../../core';

import { LogoStateInitialize } from './logo-state-initialize';
import { LogoStateMotion } from './logo-state-motion';

export class LogoActor extends Actor2D {
    registerStates(): void {
        this.state.registerState(new LogoStateInitialize(this));
        this.state.registerState(new LogoStateMotion(this));
    }
}
