import { Scene, State } from '../../../core';

/**
 * Initial loading
 */
export class StateStartMotion implements State {
    id: 'start-motion';

    constructor(private readonly scene: Scene) {}

    Start(): void {}
    End(): void {}
}
