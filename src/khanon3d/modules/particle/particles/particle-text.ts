import { Observable } from 'rxjs';

import { Color4 } from '@babylonjs/core/Maths/math.color';

import { Particle } from '../particle';
import { ParticleProperties } from '../particle-properties';
import { MotionSpriteBasic } from '../../motion/motions/motion-sprite-basic';
import { Sprite } from '../../sprite/sprite';

export interface ParticleTextProperties extends ParticleProperties {
    text: string;
    foregroundColor: Color4;
    backgroundColor: Color4;
}

export class ParticleText extends Particle<Sprite> {
    id: 'ParticleText';
    motion: MotionSpriteBasic;

    constructor(protected readonly properties: ParticleTextProperties, protected readonly loopUpdate$?: Observable<number>) {
        super(properties, loopUpdate$);
    }

    onInitialize(): void {
        // const sprite = this.spritesManager.addSprite(
        //     new Sprite('', {
        //         url: '',
        //         width: 0,
        //         height: 0,
        //         numFrames: 0,
        //     })
        // );
        // this.setDisplayObject(sprite);
        // this.motion = new MotionSpriteBasic(this.displayObject, this.loopUpdate$);
        // this.motion.initialize({}, () => this.end());
    }

    onStart(): void {}

    onEnd(): void {
        this.displayObject.release();
    }
}
