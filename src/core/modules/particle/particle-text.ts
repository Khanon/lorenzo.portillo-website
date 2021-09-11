import { Observable } from 'rxjs';

import { Color4 } from '@babylonjs/core/Maths/math.color';
import { Scene as BabylonJsScene } from '@babylonjs/core/scene';

import { Particle } from './particle';
import { ParticleProperties } from './particle-properties';

export interface ParticleTextProperties extends ParticleProperties {
    text: string;
    foregroundColor: Color4;
    backgroundColor: Color4;
}

export class ParticleText extends Particle {
    name: 'ParticleText';

    constructor(protected readonly properties: ParticleTextProperties, protected readonly loopUpdate$?: Observable<number>) {
        super(properties, loopUpdate$);
    }

    initialize(scene: BabylonJsScene): void {
        this.setDisplayObject(null);    // 8a8f
    }

    onStart(): void {

    }

    onEnd(): void {

    }
}
