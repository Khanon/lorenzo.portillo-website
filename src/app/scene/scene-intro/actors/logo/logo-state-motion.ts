import { Actor2D, State } from '../../../../../core';

export class LogoStateMotion extends State<Actor2D> {
    id: string = 'motion';

    start(): void {
        this.parent.sprite.play(50, false);
    }
    end(): void {
        this.parent.sprite.setFrame(-1);
    }
}
