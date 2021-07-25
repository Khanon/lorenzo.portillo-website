import { Scene, State } from '../../../core';

/**
 * Initial loading
 */
export class StateInitialize implements State {
    id: 'initialize';

    constructor(private readonly scene: Scene) {}

    Start(): void {}
    End(): void {}
}
