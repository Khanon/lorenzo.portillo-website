import { Observable, Subject } from 'rxjs';

import { DimensionsWH } from './dimensions-wh';

export interface CoreSubscriptions {
    /** Outputs */
    canvasResize$: Observable<DimensionsWH>;
    loopUpdate$: Observable<number>;
    physicsUpdate$: Observable<number>;
    /** Inputs */
    onError$: Subject<string>;
}
