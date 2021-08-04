import { Observable, Subscription } from 'rxjs';

import { LoopUpdateable } from '../../models/loop-updateable';

export abstract class Action<T, P> extends LoopUpdateable {
    protected properties: P;

    constructor(readonly id: string, protected readonly target: T, protected readonly loopUpdate$?: Observable<number>) {
        super(loopUpdate$);
    }

    abstract play(): void;
    abstract stop(): void;

    setProperties(properties: P): void {
        this.properties = properties;
    }
}
