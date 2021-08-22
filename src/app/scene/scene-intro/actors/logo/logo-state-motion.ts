import { Actor2D, State } from '../../../../../core';

export class LogoStateMotion extends State<Actor2D> {
    start(): void {
        this.target.sprite.play(50, false);
    }

    end(): void {
        this.target.sprite.setFrame(-1);
    }
}
