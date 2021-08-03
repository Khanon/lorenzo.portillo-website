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
        this.parent.setY(this.endMotion.y);
        this.parent.setZ(this.endMotion.z);
        this.parent.setScale(this.endMotion.scale);
    }

    loopUpdate(delta: number): void {
        const speed = 0.05 * delta;
        const step = Misc.Maths.increaseVectorWithInertia(
            [this.parent.getY(), this.parent.getZ(), this.parent.getScale()],
            [this.endMotion.y, this.endMotion.z, this.endMotion.scale],
            speed,
            1,
            () => {
                this.end();
            }
        );
        this.parent.setY(step[0]);
        this.parent.setZ(step[1]);
        this.parent.setScale(step[2]);
    }
}
