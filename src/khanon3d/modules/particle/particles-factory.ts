import { Scene as BabylonJsScene } from '@babylonjs/core/scene';

import { Particle } from './particle';
import { DisplayObject } from '../../models/display-object';
import { AssetsManager } from '../assets-manager/assets-manager';

export class ParticlesFactory {
    constructor(private readonly babylonJsScene: BabylonJsScene, private readonly assetsManager: AssetsManager, private readonly parent?: DisplayObject) {}

    new(particle: Particle): void {
        particle.initialize(this.babylonJsScene, this.assetsManager, this.parent);
        particle.start();
    }
}
