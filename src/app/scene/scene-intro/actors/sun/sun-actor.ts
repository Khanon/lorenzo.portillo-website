import { Scene as BabylonJsScene } from '@babylonjs/core/scene';

import { Actor2D, Sprite } from '../../../../../khanon3d';

import { SunStateMotion } from './sun-state-motion';

export class SunActor extends Actor2D {
    createDisplayObject(babylonJsScene: BabylonJsScene): Sprite {
        return new Sprite(this.name, { url: './assets/scene-intro/sprites/sun.png', numFrames: 1 });
    }

    initialize(): void {
        this.state.registerState(new SunStateMotion('motion', this, this.properties.loopUpdate$));

        this.sprite.setFrame(0);
        this.setX(0);
        this.setY(280);
        this.setZ(-500);
        this.setScale(0.7);
    }
}
