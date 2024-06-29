import {
  Color3,
  MeshBuilder,
  StandardMaterial
} from '@babylonjs/core'
import {
  KJS,
  Logger,
  Mesh,
  MeshInterface
} from '@khanonjs/engine'

@Mesh()
export class EarthMesh extends MeshInterface {
  onSpawn(scene: KJS.Scene) {
    const flatMaterial = new StandardMaterial('', scene.babylon.scene)
    flatMaterial.disableLighting = true
    flatMaterial.emissiveColor = new Color3(0.13, 0.13, 0.13)
    const meshBjs = MeshBuilder.CreateDisc('EarthMesh', { radius: 1125, tessellation: 200 }, scene.babylon.scene)
    meshBjs.material = flatMaterial
    this.setMesh(meshBjs)
  }
}
