import * as BABYLON from '@babylonjs/core'
import {
  Logger,
  Mesh,
  MeshInterface
} from '@khanonjs/engine'

@Mesh()
export class EarthMesh extends MeshInterface {
  onSpawn() {
    const flatMaterial = new BABYLON.StandardMaterial('earth', this.babylon.scene)
    flatMaterial.disableLighting = true
    flatMaterial.emissiveColor = new BABYLON.Color3(0.13, 0.13, 0.13)
    const meshBjs = BABYLON.MeshBuilder.CreateDisc('EarthMesh', { radius: 1125, tessellation: 200 }, this.babylon.scene)
    meshBjs.material = flatMaterial
    this.setMesh(meshBjs)
  }
}
