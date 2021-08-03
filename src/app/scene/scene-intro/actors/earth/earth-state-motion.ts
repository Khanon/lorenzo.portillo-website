import { Actor3D, Misc, State } from '../../../../../core/index';

export class EarthStateMotion extends State<Actor3D> {
    readonly endMotion = { y: -7.13, scale: 0.98 };

    start(): void {
        setTimeout(() => {
            this.subscribeLoopUpdate();
        }, 500);
    }

    end(): void {
        this.unSubscribeLoopUpdate();
        this.parent.setY(this.endMotion.y);
        this.parent.setScale(this.endMotion.scale);
    }

    loopUpdate(delta: number): void {
        const speed = 0.03 * delta;
        const acc = 2;
        const step = Misc.Maths.increaseVectorWithInertia(
            [this.parent.getY(), this.parent.getScale()],
            [this.endMotion.y, this.endMotion.scale],
            speed,
            acc,
            () => {
                this.end();
            }
        );
        this.parent.setY(step[0]);
        this.parent.setScale(step[1]);
    }
}
