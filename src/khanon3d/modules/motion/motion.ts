import { Observable } from 'rxjs';

import { LoopUpdateable } from '../../models/loop-updateable';
import { MotionProperties } from './motion-properties';
import { DisplayObject } from '../../models/display-object';

export abstract class Motion extends LoopUpdateable {
    displayObject: DisplayObject;
    protected onDoneCallback: () => void;

    constructor(protected readonly properties: MotionProperties, protected readonly loopUpdate$: Observable<number>) {
        super(loopUpdate$);
    }

    abstract onInitialize(): void;
    abstract loopUpdate(delta: number): void;

    initialize(displayObject: DisplayObject, onDone?: () => void): void {
        this.displayObject = displayObject;
        this.onDoneCallback = onDone;
        this.onInitialize();
    }

    start(): void {
        this.subscribeLoopUpdate();
    }

    end(): void {
        this.unSubscribeLoopUpdate();
    }

    protected done(): void {
        this.end();
        this.onDoneCallback();
    }
}
