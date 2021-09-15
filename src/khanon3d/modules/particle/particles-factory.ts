import { Scene as BabylonJsScene } from '@babylonjs/core/scene';

import { Particle } from './particle';
import { SpritesManager } from '../sprite/sprites-manager';
import { MeshesManager } from '../mesh/meshes-manager';
import { DisplayObject } from '../../models/display-object';

export class ParticlesFactory {
    constructor(
        private readonly babylonJsScene: BabylonJsScene,
        private readonly spritesManager: SpritesManager,
        private readonly meshesManager: MeshesManager,
        private readonly parent?: DisplayObject
    ) {}

    new(particle: Particle): void {
        particle.initialize(this.babylonJsScene, this.spritesManager, this.meshesManager, this.parent);
        particle.start();
    }
}
