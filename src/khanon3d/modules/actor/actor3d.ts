import { Scene as BabylonJsScene } from '@babylonjs/core/scene';

import { Actor } from './actor';
import { Mesh } from '../mesh/mesh';
import { ActorProperties } from './actor-properties';
import { MeshAnimation } from '../mesh/mesh-animation';

export abstract class Actor3D extends Actor {
    protected _mesh: Mesh;

    constructor(readonly name: string, protected readonly properties?: ActorProperties) {
        super(name, properties);
    }

    get mesh(): Mesh {
        return this._mesh;
    }

    abstract createDisplayObject(babylonJsScene: BabylonJsScene): Mesh;

    protected setDisplayObject(displayObject: Mesh): void {
        this._mesh = displayObject;
    }

    setAnimation(id: number, loop: boolean = true, completed?: () => void): void {}
}
