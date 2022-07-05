import { TextBlock } from '@babylonjs/gui/2D/controls/textBlock';
import { GUI, Scene } from '@khanonjs/engine';
import { AppSceneProperties } from '../app-scene-properties';
export declare class SceneWorld extends Scene {
    protected readonly properties: AppSceneProperties;
    static id: string;
    id: string;
    private camera;
    gui: GUI;
    textCanvasSize: TextBlock;
    constructor(properties: AppSceneProperties);
    onLoad(): void;
    onPlay(): void;
    onStop(): void;
    onRelease(): void;
    onError(errorMsg: string): void;
    subscribeCanvasResize(): void;
}
