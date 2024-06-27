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
  onSpawn(scene: KJS.Scene) {
    Logger.trace('aki ActorEarth onSpawn', this)
    this.composition.setBody(EarthMesh)
    // 8a8f
    // this.state.registerState(new EarthStateMotion('motion', this));
    Logger.trace('aki EarthActor transform', this.transform)
    this.transform.rotate(new Vector3(0, 1, 0), Math.PI / 2)
    this.transform.position.x = -10
    this.transform.position.y = -1110
    this.transform.scaling = new Vector3(1, 1, 1)
  }
}
