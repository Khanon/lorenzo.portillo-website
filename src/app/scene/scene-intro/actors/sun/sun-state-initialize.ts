import { Actor2D, State } from '../../../../../core';

export class SunStateInitialize extends State<Actor2D> {
    id: string = 'initialize';

    start(): void {
        this.parent.sprite.setFrame(0);
        this.parent.setY(1.02);
        this.parent.setZ(-3.16);
        this.parent.setScale(0.7);
    }
    end(): void {}
}
