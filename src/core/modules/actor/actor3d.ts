import { Scene as BabylonJsScene } from '@babylonjs/core/scene';

import { Actor } from '../actor/actor';
import { Mesh } from '../mesh/mesh';
import { ActorProperties } from './actor-properties';

export abstract class Actor3D extends Actor {
    protected _mesh: Mesh;

    constructor(readonly name: string, protected readonly properties?: ActorProperties) {
        super(name, properties);
    }

    abstract createDisplayObject(babylonJsScene: BabylonJsScene): Mesh;
    abstract initialize(): void;

    protected setDisplayObject(displayObject: Mesh): void {
        this._mesh = displayObject;
    }

    get mesh(): Mesh {
        return this._mesh;
    }
}
