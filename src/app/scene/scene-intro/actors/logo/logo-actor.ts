import { Actor2D, Sprite } from '../../../../../core/index';

import { LogoStateMotion } from './logo-state-motion';

export class LogoActor extends Actor2D {
    createDisplayObject(): Sprite {
        return new Sprite(this.name, { url: './assets/scene-loading/sprites/logo.png', width: 453, height: 115, numFrames: 59 });
    }

    initialize(): void {
        this.state.registerState(new LogoStateMotion('motion', this));

        this.setX(0.01);
        this.setY(0.8);
        this.setZ(1.75);
    }
}