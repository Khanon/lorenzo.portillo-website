import { Actor2D, State } from '../../../../../khanon3d';

export class LogoStateMotion extends State<Actor2D> {
    start(): void {
        this.target.sprite.play({ delay: 50, loop: false });
    }

    end(): void {
        this.target.sprite.setFrame(-1);
    }
}
