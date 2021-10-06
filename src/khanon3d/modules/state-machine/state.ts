import { Observable } from 'rxjs';

import { LoopUpdateable } from '../../models/loop-updateable';

export abstract class State<T> extends LoopUpdateable {
    constructor(readonly id: string, protected readonly subject: T) {
        super();
    }

    abstract start(): void;
    abstract end(): void;

    /**
     * Override on child to notify messages to this actor from outer scene
     *
     * @param id
     */
    notify(id: any): void {}
}
