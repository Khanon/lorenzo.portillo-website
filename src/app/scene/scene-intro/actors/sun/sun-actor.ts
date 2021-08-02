import { Actor2D, Sprite } from '../../../../../core';

import { SunStateMotion } from './sun-state-motion';

export class SunActor extends Actor2D {
    addToScene(): Sprite {
        return this.scene.addSprite('sun', './assets/scene-loading/sprites/sun.png', { width: 270, height: 270, numFrames: 1 });
    }

    initialize(): void {
        this.state.registerState(new SunStateMotion('motion', this, this.scene.getLoopUpdate()));

        this.sprite.setFrame(0);
        this.setX(0.01);
        this.setY(1.52);
        this.setZ(-3.16);
        this.setScale(0.7);
    }
}
