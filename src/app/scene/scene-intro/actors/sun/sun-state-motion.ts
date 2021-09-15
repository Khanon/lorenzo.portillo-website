import { Actor2D, Misc, State } from '../../../../../khanon3d';

export class SunStateMotion extends State<Actor2D> {
    readonly endMotion = { y: 0.3, z: -1.65, scale: 1.15 };

    start(): void {
        setTimeout(() => {
            this.subscribeLoopUpdate();
        }, 700);
    }

    end(): void {
        this.unSubscribeLoopUpdate();
        this.subject.setY(this.endMotion.y);
        this.subject.setZ(this.endMotion.z);
        this.subject.setScale(this.endMotion.scale);
    }

    loopUpdate(delta: number): void {
        const speed = 0.05 * delta;
        const step = Misc.Maths.increaseVectorWithInertia(
            [this.subject.getY(), this.subject.getZ(), this.subject.getScale()],
            [this.endMotion.y, this.endMotion.z, this.endMotion.scale],
            speed,
            1,
            () => this.end()
        );
        this.subject.setY(step[0]);
        this.subject.setZ(step[1]);
        this.subject.setScale(step[2]);
    }
}
