import { Observable } from 'rxjs';

import { Actor, Mesh } from '../';

export class Actor3D extends Actor {
    constructor(readonly name: string, protected readonly displayObject: Mesh, protected readonly loopUpdate$: Observable<number>) {
        super(name, displayObject, loopUpdate$);
    }

    registerStates(): void {}

    get mesh(): Mesh {
        return this.displayObject;
    }
}
