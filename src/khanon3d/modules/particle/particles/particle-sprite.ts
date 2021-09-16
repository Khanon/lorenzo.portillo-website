import { Observable } from 'rxjs';

import { Particle } from '../particle';
import { ParticleProperties } from '../particle-properties';
import { MotionSpriteBasic } from '../../motion/motions/motion-sprite-basic';
import { Sprite } from '../../sprite/sprite';
import { SpriteProperties } from '../../sprite/sprite-properties';
import { SpriteAnimation } from '../../sprite/sprite-animation';
import { ParticleEndCriteria } from '../particle-end-criteria';

export interface ParticleSpriteProperties extends ParticleProperties {
    spriteProperties: SpriteProperties;
    spriteAnimation: SpriteAnimation;
}

export class ParticleSprite extends Particle {
    id: 'ParticleSprite';
    motion: MotionSpriteBasic;

    constructor(protected readonly properties: ParticleSpriteProperties, protected readonly loopUpdate$?: Observable<number>) {
        super(properties, loopUpdate$);
    }

    createDisplayObject(): Sprite {
        const sprite = new Sprite('ParticleSprite', this.properties.spriteProperties);
        sprite.assignInstance(this.spritesManager.getSpriteInstance(this.properties.spriteProperties));
        return sprite;
    }

    onInitialize(): void {
        this.motion = new MotionSpriteBasic(this.displayObject, this.loopUpdate$);
        this.motion.initialize({});
    }

    onStart(): void {
        this.displayObject.play(
            this.properties.spriteAnimation,
            undefined,
            this.properties.endCriteria === ParticleEndCriteria.ANIMATION_END ? () => this.end() : undefined
        );
    }

    onEnd(): void {
        this.displayObject.release();
    }
}
