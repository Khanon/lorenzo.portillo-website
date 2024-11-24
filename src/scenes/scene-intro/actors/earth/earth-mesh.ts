import * as BABYLON from '@babylonjs/core'
import {
  Logger,
  Mesh,
  MeshInterface,
  SceneInterface
} from '@khanonjs/engine'

@Mesh()
export class EarthMesh extends MeshInterface {
  onSpawn(scene: SceneInterface) {
    const flatMaterial = new BABYLON.StandardMaterial('earth', scene.babylon.scene)
    flatMaterial.disableLighting = true
    flatMaterial.emissiveColor = new BABYLON.Color3(0.13, 0.13, 0.13)
    const meshBjs = BABYLON.MeshBuilder.CreateDisc('EarthMesh', { radius: 1125, tessellation: 200 }, scene.babylon.scene)
    meshBjs.material = flatMaterial
    this.setMesh(meshBjs)
  }
}
