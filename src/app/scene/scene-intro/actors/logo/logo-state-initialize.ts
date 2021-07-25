import { Actor2D, State } from '../../../../../core';

export class LogoStateInitialize extends State<Actor2D> {
    id: string = 'initialize';

    start(): void {
        this.parent.setY(0.8);
        this.parent.setZ(1.75);
    }
    end(): void {}
}
