import { Actor2D, Sprite } from '../../../../../core';

export class RobocilloActor extends Actor2D {
    addToScene(): Sprite {
        return this.scene.addSprite('robocillo', './assets/scene-loading/sprites/robocillo.png', { width: 34, height: 34, numFrames: 32 });
    }

    initialize(): void {
        this.setScale(0.17);
        this.setX(-0.01);
        this.setY(0.5);
        this.setZ(0.0);
        this.sprite.play(50, true);
    }
}
