import {
    AssetsManager as BabylonJsAssetsManager,
    SceneLoader,
} from '@babylonjs/core';

import { Scene } from '.';

export class AssetsManager {
    readonly babylonjs: BabylonJsAssetsManager;

    private readonly sceneLoader: SceneLoader;

    constructor(private readonly scene: Scene) {
        this.babylonjs = new BabylonJsAssetsManager(this.scene.babylonjs);
        this.sceneLoader = new SceneLoader();
    }
}