import { Actor3D, Misc, State } from '../../../../../core';

export class EarthStateMotion extends State<Actor3D> {
    private readonly endMotion = { y: -7.13, scale: 0.98 };

    start(): void {
        setTimeout(() => {
            this.subscribeLoopUpdate();
        }, 500);
    }

    end(): void {
        this.unSubscribeLoopUpdate();
        this.target.setY(this.endMotion.y);
        this.target.setScale(this.endMotion.scale);
    }

    loopUpdate(delta: number): void {
        const speed = 0.03 * delta;
        const acc = 2;
        const step = Misc.Maths.increaseVectorWithInertia(
            [this.target.getY(), this.target.getScale()],
            [this.endMotion.y, this.endMotion.scale],
            speed,
            acc,
            () => {
                this.end();
            }
        );
        this.target.setY(step[0]);
        this.target.setScale(step[1]);
    }
}
