import { Actor3D, Misc, State } from '../../../../../khanon3d';

export class EarthStateMotion extends State<Actor3D> {
    private readonly endMotion = { y: -7.13, scale: 0.98 };

    start(): void {
        setTimeout(() => {
            this.subscribeLoopUpdate();
        }, 500);
    }

    end(): void {
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
