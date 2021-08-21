import { Actor2D, Misc, State } from '../../../../../core/index';

export class SunStateMotion extends State<Actor2D> {
    readonly endMotion = { y: 0.3, z: -1.65, scale: 1.15 };

    start(): void {
        setTimeout(() => {
            this.subscribeLoopUpdate();
        }, 700);
    }

    end(): void {
        this.unSubscribeLoopUpdate();
        this.target.setY(this.endMotion.y);
        this.target.setZ(this.endMotion.z);
        this.target.setScale(this.endMotion.scale);
    }

    loopUpdate(delta: number): void {
        const speed = 0.05 * delta;
        const step = Misc.Maths.increaseVectorWithInertia(
            [this.target.getY(), this.target.getZ(), this.target.getScale()],
            [this.endMotion.y, this.endMotion.z, this.endMotion.scale],
            speed,
            1,
            () => {
                this.end();
            }
        );
        this.target.setY(step[0]);
        this.target.setZ(step[1]);
        this.target.setScale(step[2]);
    }
}
