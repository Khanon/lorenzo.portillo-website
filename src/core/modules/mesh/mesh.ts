import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Mesh as BabylonJsMesh } from '@babylonjs/core/Meshes/mesh';

import { DisplayObject } from '../../models/display-object';

export class Mesh implements DisplayObject {
    babylonjs: BabylonJsMesh;

    private scale: number = 1;

    constructor(babylonJsMesh: BabylonJsMesh) {
        this.babylonjs = babylonJsMesh;
    }

    get visible(): boolean {
        return this.babylonjs.isVisible;
    }
    set visible(visible: boolean) {
        this.babylonjs.isVisible = visible;
    }

    setScale(scale: number): void {
        this.scale = scale;
        this.babylonjs.scaling = new Vector3(this.scale, this.scale, this.scale);
    }

    getScale(): number {
        return this.scale;
    }
}
