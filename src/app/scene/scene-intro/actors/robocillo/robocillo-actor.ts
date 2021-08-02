import { Actor2D, Sprite } from '../../../../../core/index';

export class RobocilloActor extends Actor2D {
    createDisplayObject(): Sprite {
        return new Sprite(this.name, { url: './assets/scene-loading/sprites/robocillo.png', width: 34, height: 34, numFrames: 32 });
    }

    initialize(): void {
        this.setScale(0.17);
        this.setX(-0.01);
        this.setY(0.5);
        this.setZ(0.0);
        this.sprite.play(50, true);
    }
}
