import { Actor3D, State, WorkerTimer } from '@khanonjs/engine';
import * as Misc from '@khanonjs/engine/misc';

export class EarthStateMotion extends State<Actor3D> {
    private readonly endMotion = { y: -1110, scale: 1 };

    onStart(): void {
        WorkerTimer.setTimeout(() => this.subscribeLoopUpdate(), 500, this);
    }

    onEnd(): void {
        this.unSubscribeLoopUpdate();
        this.subject.setY(this.endMotion.y);
        this.subject.setScale(this.endMotion.scale);
    }

    loopUpdate(delta: number): void {
        const speed = 0.03 * delta;
        const acc = 2;
        const step = Misc.Maths.increaseVectorWithInertia(
            [this.subject.getY(), this.subject.getScale()],
            [this.endMotion.y, this.endMotion.scale],
            speed,
            acc,
            () => this.end()
        );
        this.subject.setY(step[0]);
        this.subject.setScale(step[1]);
    }
}
