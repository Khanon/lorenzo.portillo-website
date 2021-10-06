import { DimensionsWH } from '../../models/dimensions-wh';
import { Engine } from '../engine/engine';

export interface SceneProperties {
    engine?: Engine;
    canvas?: HTMLCanvasElement;
    canvasDimensions?: DimensionsWH;
    isDevelopmentMode?: boolean;
    fpsContainer?: string;
    assetsJsonUrl?: string;
    execute?: boolean;
}
