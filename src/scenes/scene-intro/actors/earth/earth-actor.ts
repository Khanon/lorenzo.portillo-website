import * as BABYLON from '@babylonjs/core'
import {
  Actor,
  ActorInterface,
  Helper,
  Logger,
  MeshInterface
} from '@khanonjs/engine'

import { EarthMesh } from './earth-mesh'

@Actor({
  meshes: [EarthMesh]
})
export class EarthActor extends ActorInterface<MeshInterface> {
  onSpawn(): void {
    this.setBody(EarthMesh)
    this.transform.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 2)
    this.transform.position.x = -10
    this.transform.position.y = 100
  }

  onLoopUpdate(delta: number): void {
    const endMotion = { y: -1110, scale: 1 }
    const speed = 0.01 * delta
    const acc = 2
    const step = Helper.Maths.increaseVectorWithInertia(
      [this.transform.position.y],
      [endMotion.y],
      speed,
      acc,
      () => {
        this.transform.position.y = endMotion.y
        this.loopUpdate = false
      }
    )
    this.transform.position.y = step[0]
  }
}
