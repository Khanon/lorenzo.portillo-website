import { Actor, Scene, Sprite } from '../';

export abstract class Actor2D extends Actor {
    protected readonly displayObject: Sprite;

    constructor(readonly name: string, protected readonly scene: Scene) {
        super(name, scene);
    }

    abstract addToScene(): Sprite;
    abstract initialize(): void;

    get sprite(): Sprite {
        return this.displayObject;
    }
}
