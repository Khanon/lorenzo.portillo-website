import { Actor2D, State } from '@khanonjs/engine';

export class LogoStateMotion extends State<Actor2D> {
    onStart(): void {
        this.subject.sprite.play({ delay: 30, loop: false });
    }

    onEnd(): void {
        this.subject.sprite.setFrame(-1);
    }
}
