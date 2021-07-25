import { Observable } from 'rxjs';

import { DimensionsWH } from './dimensions-wh';

export interface CoreSubscriptions {
    canvasResize: Observable<DimensionsWH>;
    loopUpdate: Observable<number>;
}
