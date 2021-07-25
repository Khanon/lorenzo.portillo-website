import { Actor3D, Misc, State } from '../../../../../core';

export class EarthStateMotion extends State<Actor3D> {
    id: string = 'motion';

    readonly endMotion = { x: -2.72, y: -0.48 };

    start(): void {
        this.subscribeLoopUpdate();
    }

    end(): void {
        this.unsubscribeLoopUpdate();
        this.parent.setX(this.endMotion.x);
        this.parent.setY(this.endMotion.y);
    }

    loopUpdate(delta: number): void {
        const speed = 0.05 * delta;
        const acc = 2;
        const step = Misc.Maths.increaseVectorWithInertia([this.parent.getX(), this.parent.getY()], [this.endMotion.x, this.endMotion.y], speed, acc, () => {
            this.end();
        });
        this.parent.setX(step[0]);
        this.parent.setY(step[1]);
    }
}
