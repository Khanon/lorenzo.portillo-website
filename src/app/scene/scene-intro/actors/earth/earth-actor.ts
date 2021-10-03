import { Color3 } from '@babylonjs/core/Maths/math.color';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { Scene as BabylonJsScene } from '@babylonjs/core/scene';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';

import { Actor3D, Mesh } from '../../../../../khanon3d';

import { EarthStateMotion } from './earth-state-motion';

export class EarthActor extends Actor3D {
    createDisplayObject(babylonJsScene: BabylonJsScene): Mesh {
        const flatMaterial = new StandardMaterial('', babylonJsScene);
        flatMaterial.disableLighting = true;
        flatMaterial.emissiveColor = new Color3(0.13, 0.13, 0.13);
        const meshBjs = MeshBuilder.CreateDisc(this.name, {
            radius: 1125,
            tessellation: 200,
        });
        meshBjs.material = flatMaterial;

        return new Mesh(this.name, meshBjs);
    }

    initialize(): void {
        this.state.registerState(new EarthStateMotion('motion', this, this.properties.loopUpdate$));

        this.mesh.babylonjs.rotate(new Vector3(0, 1, 0), Math.PI / 2);
        this.setX(-10);
        this.setY(100);
        this.setScale(1);
    }

    release(): void {}
}
