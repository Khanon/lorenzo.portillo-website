import { Scene as BabylonJsScene } from '@babylonjs/core/scene';

import { Actor2D, Sprite } from '../../../../../khanon3d';
import { LogoStateMotion } from './logo-state-motion';

export class LogoActor extends Actor2D {
    createDisplayObject(babylonJsScene: BabylonJsScene): Sprite {
        return new Sprite(this.name, { url: './assets/scene-intro/sprites/logo.png', numFrames: 59 });
    }

    initialize(): void {
        this.state.registerState(new LogoStateMotion('motion', this));

        this.setX(0.01);
        this.setY(0.8);
        this.setZ(1.75);
    }
}
