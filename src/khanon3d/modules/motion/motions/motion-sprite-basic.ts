import { Observable } from 'rxjs';

import { Vector3 } from '@babylonjs/core/Maths/math.vector';

import { Motion } from '../motion';
import { MotionEndCriteria } from '../motion-end-criteria';
import { MotionProperties } from '../motion-properties';

export interface MotionSpriteBasicProperties extends MotionProperties {
    alphaStart: number;
    alphaEnd?: number;
    alphaVel?: number;
    posVel?: Vector3;
}

export class MotionSpriteBasic extends Motion {
    private stack: any[] = [];

    constructor(protected readonly properties: MotionSpriteBasicProperties, protected readonly loopUpdate$: Observable<number>) {
        super(properties, loopUpdate$);
    }

    onInitialize(): void {
        this.displayObject.setAlpha(this.properties.alphaStart);

        if (this.properties.alphaVel) {
            if (this.properties.alphaStart < this.properties.alphaEnd) {
                this.stack.push((delta: number) => this.alphaAdd(delta));
            } else {
                this.stack.push((delta: number) => this.alphaSub(delta));
            }
        }
        if (this.properties.posVel) {
            this.stack.push((delta: number) => this.posAdd(delta));
        }
    }

    loopUpdate(delta: number): void {
        this.stack.forEach((fn) => fn(delta));
    }

    alphaAdd(delta: number): void {
        this.displayObject.setAlpha(this.displayObject.getAlpha() + this.properties.alphaVel * delta);
        if (this.displayObject.getAlpha() >= this.properties.alphaEnd) {
            this.displayObject.setAlpha(this.properties.alphaEnd);
            if (this.properties.endCriteria === MotionEndCriteria.ALPHA_END) {
                this.done();
            }
        }
    }

    alphaSub(delta: number): void {
        this.displayObject.setAlpha(this.displayObject.getAlpha() - this.properties.alphaVel * delta);
        if (this.displayObject.getAlpha() <= this.properties.alphaEnd) {
            this.displayObject.setAlpha(this.properties.alphaEnd);
            if (this.properties.endCriteria === MotionEndCriteria.ALPHA_END) {
                this.done();
            }
        }
    }

    posAdd(delta: number): void {
        this.displayObject.babylonjs.position.addInPlace(this.properties.posVel.scale(delta));
    }
}
