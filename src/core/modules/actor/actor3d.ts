import { Actor, Mesh, Scene } from '../';

export abstract class Actor3D extends Actor {
    protected readonly displayObject: Mesh;

    constructor(readonly name: string, protected readonly scene: Scene) {
        super(name, scene);
    }

    abstract addToScene(): Mesh;
    abstract initialize(): void;

    get mesh(): Mesh {
        return this.displayObject;
    }
}
