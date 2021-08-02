import { Color3 } from '@babylonjs/core/Maths/math.color';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';

import { Actor3D, Mesh } from '../../../../../core';

import { EarthStateMotion } from './earth-state-motion';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';

export class EarthActor extends Actor3D {
    addToScene(): Mesh {
        return this.scene.addMesh(() => {
            const flatMaterial = new StandardMaterial('', this.scene.babylonjs);
            flatMaterial.disableLighting = true;
            flatMaterial.emissiveColor = new Color3(0.13, 0.13, 0.13);
            const mesh = MeshBuilder.CreateDisc('earth', {
                radius: 7.5,
                tessellation: 200,
            });
            mesh.material = flatMaterial;
            return mesh;
        });
    }

    initialize(): void {
        this.state.registerState(new EarthStateMotion('motion', this, this.scene.getLoopUpdate()));

        this.displayObject.babylonjs.rotate(new Vector3(0, 1, 0), Math.PI / 2);

        this.setScale(1.2);
        this.setY(-6.9);
    }
}
