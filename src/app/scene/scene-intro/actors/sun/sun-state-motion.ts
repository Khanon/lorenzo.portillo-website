import { Actor2D, State } from '../../../../../khanon3d';
import * as Misc from '../../../../../khanon3d/modules/misc';

export class SunStateMotion extends State<Actor2D> {
    readonly endMotion = { y: 45, z: -215, scale: 0.9 };

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
        const step = Misc.Maths.increaseVectorWithInertia([this.subject.getY(), this.subject.getZ()], [this.endMotion.y, this.endMotion.z], 0.05 * delta, 1);
        const scale = Misc.Maths.increaseValueWithInertia(this.subject.getScale(), this.endMotion.scale, 0.005 * delta, 1, () => this.end());
        this.subject.setY(step[0]);
        this.subject.setZ(step[1]);
        this.subject.setScale(scale);
    }
}
