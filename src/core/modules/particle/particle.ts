import { Observable } from 'rxjs';

import { LoopUpdateable } from '../../models/loop-updateable';
import { DisplayObject } from '../../models/display-object';

export abstract class Particle extends LoopUpdateable {
    constructor(protected readonly displayObject: DisplayObject, protected readonly loopUpdate$?: Observable<number>) {
        super(loopUpdate$);
    }

    start(): void {
        this.subscribeLoopUpdate();
        this.onStart();
    }

    end(): void {
        this.unSubscribeLoopUpdate();
        this.onEnd();
    }

    abstract onStart(): void;
    abstract onEnd(): void;
    abstract loopUpdate(): void;
}
