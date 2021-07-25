import { Observable } from 'rxjs';

import { Actor, Sprite } from '../';

export class Actor2D extends Actor {
    constructor(readonly name: string, protected readonly displayObject: Sprite, protected readonly loopUpdate$: Observable<number>) {
        super(name, displayObject, loopUpdate$);
    }

    registerStates(): void {}

    get sprite(): Sprite {
        return this.displayObject;
    }
}
