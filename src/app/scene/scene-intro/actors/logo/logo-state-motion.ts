import { Actor2D, State } from '../../../../../core/index';

export class LogoStateMotion extends State<Actor2D> {
    start(): void {
        this.parent.sprite.play(50, false);
    }

    end(): void {
        this.parent.sprite.setFrame(-1);
    }
}
