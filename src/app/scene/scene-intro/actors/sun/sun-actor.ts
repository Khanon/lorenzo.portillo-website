import { Actor2D, Sprite } from '../../../../../core/index';

import { SunStateMotion } from './sun-state-motion';

export class SunActor extends Actor2D {
    createDisplayObject(): Sprite {
        return new Sprite(this.name, { url: './assets/scene-loading/sprites/sun.png', width: 270, height: 270, numFrames: 1 });
    }

    initialize(): void {
        this.state.registerState(new SunStateMotion('motion', this, this.properties.loopUpdate$));

        this.sprite.setFrame(0);
        this.setX(0.01);
        this.setY(1.52);
        this.setZ(-3.16);
        this.setScale(0.7);
    }
}