import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Mesh as BabylonJsMesh } from '@babylonjs/core/Meshes/mesh';

import { DisplayObject } from '../../models/display-object';

export class Mesh extends DisplayObject {
    readonly babylonjs: BabylonJsMesh;

    private scale: number = 1;

    constructor(protected readonly name, babylonJsMesh: BabylonJsMesh) {
        super(name);
        this.babylonjs = babylonJsMesh;
    }

    get visible(): boolean {
        return this.babylonjs.isVisible;
    }
    set visible(visible: boolean) {
        this.babylonjs.isVisible = visible;
    }

    setRotation(rotation: Vector3): void {
        // 8a8f TODO
        // this.babylonjs.rotate = rotation;
    }

    getRotation(): Vector3 {
        // 8a8f TODO
        return new Vector3(0, 0, 0);
    }

    setScale(scale: number): void {
        this.scale = scale;
        this.babylonjs.scaling = new Vector3(this.scale, this.scale, this.scale);
    }

    getScale(): number {
        return this.scale;
    }
}
