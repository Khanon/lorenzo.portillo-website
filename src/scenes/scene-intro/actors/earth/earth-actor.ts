import { Vector3 } from '@babylonjs/core/Maths/math.vector'
import {
  Actor,
  ActorInterface,
  KJS,
  Logger,
  MeshInterface
} from '@khanonjs/engine'

import { EarthMesh } from './earth-mesh'

@Actor({
  meshes: [EarthMesh]
})
export class EarthActor extends ActorInterface<MeshInterface> {
  // @ActorMesh()  // 8a8f
  // // earthMesh: MeshInterface

  // onLoopUpdate(delta: number): void {
  //   console.log('aki delta', delta)
  // }

  onSpawn(scene: KJS.Scene) {
    this.composition.setBody(EarthMesh)
    this.transform.rotate(new Vector3(0, 1, 0), Math.PI / 2)
    this.transform.position.x = -10
    this.transform.position.y = -1110
    this.transform.scaling = new Vector3(1, 1, 1)
  }
}
