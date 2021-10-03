import { MotionEndCriteria } from './motion-end-criteria';
import { DisplayObject } from '../../models/display-object';

export interface MotionProperties {
    endCriteria?: MotionEndCriteria;
    endValue?: number;
}
