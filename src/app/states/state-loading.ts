import { Scene, State } from '../../core';

/**
 * Initial loading
 */
export class StateLoading implements State {
    constructor(private readonly scene: Scene) {}

    Load(): void {}

    Unload(): void {}
}
