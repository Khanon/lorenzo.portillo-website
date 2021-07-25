import { CoreSubscriptions, DimensionsWH } from '../../models';
import { Engine } from '../..';

export interface SceneStart {
    engine?: Engine;
    canvas?: HTMLCanvasElement;
    canvasDimensions?: DimensionsWH;
    coreSubscriptions?: CoreSubscriptions;
    isDevelopmentMode?: boolean;
    fpsContainer?: string;
}
