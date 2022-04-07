import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Actor2D, State, WorkerTimer } from '@khanonjs/engine';
import * as Misc from '@khanonjs/engine/misc';

export class SunStateMotion extends State<Actor2D> {
    static paramsRatio0Pos = new Vector3(0, 12, -79);
    static paramsRatio1Pos = new Vector3(0, 25, -215);
    static paramsRatio0Scale = 0.6;
    static paramsRatio1Scale = 0.9;
    static endPosition: Vector3;
    static endScale: number = 0;

    onStart(): void {
        WorkerTimer.setTimeout(() => this.subscribeLoopUpdate(), 700, this);
    }

    onEnd(): void {
        this.unSubscribeLoopUpdate();
        this.subject.setY(SunStateMotion.endPosition.y);
        this.subject.setZ(SunStateMotion.endPosition.z);
        this.subject.setScale(SunStateMotion.endScale);
    }

    loopUpdate(delta: number): void {
        const step = Misc.Maths.increaseVectorWithInertia(
            [this.subject.getY(), this.subject.getZ()],
            [SunStateMotion.endPosition.y, SunStateMotion.endPosition.z],
            0.05 * delta,
            1
        );
        const scale = Misc.Maths.increaseValueWithInertia(this.subject.getScale(), SunStateMotion.endScale, 0.005 * delta, 1, () => this.end());
        this.subject.setY(step[0]);
        this.subject.setZ(step[1]);
        this.subject.setScale(scale);
    }
}
