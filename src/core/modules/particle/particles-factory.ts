import { Scene as BabylonJsScene } from '@babylonjs/core/scene';

import { Particle } from './particle';

export class ParticlesFactory {
    constructor(private readonly babylonJsScene: BabylonJsScene) {}

    new(particle: Particle): void {
        particle.initialize(this.babylonJsScene);
        particle.start();
    }
}
