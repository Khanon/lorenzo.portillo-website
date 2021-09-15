import { Observable } from 'rxjs';

import { LoopUpdateable } from '../../models/loop-updateable';

export abstract class Motion<T = any> extends LoopUpdateable {
    constructor(protected readonly subject: T, protected readonly loopUpdate$?: Observable<number>) {
        super(loopUpdate$);
    }

    abstract initialize(properties: Object, onDone?: () => void): void;
    abstract onStart(): void;
    abstract onEnd(): void;
    abstract loopUpdate(delta: number): void;

    start(): void {
        this.onStart();
        this.subscribeLoopUpdate();
    }

    end(): void {
        this.onEnd();
        this.unSubscribeLoopUpdate();
    }
}
