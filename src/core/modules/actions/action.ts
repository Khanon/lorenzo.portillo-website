import { Observable } from 'rxjs';

import { LoopUpdateable } from '../../models/loop-updateable';

export abstract class Action<T, P> extends LoopUpdateable {
    isPlaying: boolean = false;
    protected properties: P;

    constructor(readonly id: string, protected readonly target: T, protected readonly loopUpdate$?: Observable<number>) {
        super(loopUpdate$);
    }

    /**
     * Don't override
     */
    play(): void {
        this.isPlaying = true;
        this.onPlay();
    }

    /**
     * Don't override
     */
    stop(): void {
        this.isPlaying = false;
        this.onStop();
    }

    abstract onPlay(): void;
    abstract onStop(): void;

    setProperties(properties: P): void {
        this.properties = properties;
    }
}
