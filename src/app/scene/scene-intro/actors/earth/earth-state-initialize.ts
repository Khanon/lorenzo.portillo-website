import { Actor3D, State } from '../../../../../core';

export class EarthStateInitialize extends State<Actor3D> {
    id: string = 'initialize';

    start(): void {
        this.parent.setX(-2.57);
        this.parent.setY(-0.31);
    }
    end(): void {}
}
