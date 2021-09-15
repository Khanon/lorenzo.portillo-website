import { CoreSubscriptions } from '../../models/core-subscriptions';
import { DimensionsWH } from '../../models/dimensions-wh';
import { Engine } from '../engine/engine';

export interface SceneProperties {
    engine?: Engine;
    canvas?: HTMLCanvasElement;
    canvasDimensions?: DimensionsWH;
    coreSubscriptions?: CoreSubscriptions;
    isDevelopmentMode?: boolean;
    fpsContainer?: string;
}
