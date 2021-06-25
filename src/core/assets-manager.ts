import { AssetsManager as BabylonJsAssetsManager } from '@babylonjs/core';

import { Scene } from '.';

export class AssetsManager {
    private readonly handler: BabylonJsAssetsManager;

    constructor(private readonly scene: Scene) {
        this.handler = new BabylonJsAssetsManager(this.scene.sceneBabylonjs);
    }
}
