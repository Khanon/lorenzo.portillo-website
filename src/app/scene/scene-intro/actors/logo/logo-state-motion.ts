import { Actor2D, State } from '../../../../../khanon3d';

export class LogoStateMotion extends State<Actor2D> {
    onStart(): void {
        this.subject.sprite.play({ delay: 50, loop: false });
    }

    onEnd(): void {
        this.subject.sprite.setFrame(-1);
    }
}
