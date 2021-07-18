import { CoreSubscriptions, DimensionsWH } from '../../models';
import { Engine, Logger } from '../..';

export interface SceneStart {
    engine: Engine;
    canvas: HTMLCanvasElement;
    canvasDimensions: DimensionsWH;
    coreSubscriptions: CoreSubscriptions;
    logger: Logger;
    isDevelopmentMode?: boolean;
}
