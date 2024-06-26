import {
  Color3,
  MeshBuilder,
  StandardMaterial
} from '@babylonjs/core'
import { Vector3 } from '@babylonjs/core/Maths/math.vector'
import { TransformNode } from '@babylonjs/core/Meshes/transformNode'
import {
  KJS,
  Logger,
  Mesh,
  MeshInterface
} from '@khanonjs/engine'

@Mesh()
export class EarthMesh extends MeshInterface {
  onSpawn(scene: KJS.Scene) {
    Logger.trace('aki EarthMesh onSpawn')
    const flatMaterial = new StandardMaterial('', scene.babylon.scene)
    flatMaterial.disableLighting = true
    flatMaterial.emissiveColor = new Color3(0.13, 0.13, 0.13)
    const meshBjs = MeshBuilder.CreateDisc('', { radius: 1125, tessellation: 200 }, scene.babylon.scene)
    meshBjs.material = flatMaterial
    this.setMesh(meshBjs)

    // 8a8f
    // this.state.registerState(new EarthStateMotion('motion', this));
    this.transform.rotate(new Vector3(0, 1, 0), Math.PI / 2)
    this.transform.position.x = -10
    this.transform.position.y = -1110
    this.transform.scaling = new Vector3(1, 1, 1)
  }
}
