import {
  Actor,
  ActorComposition,
  ActorInterface,
  KJS,
  Logger,
  MeshInterface
} from '@khanonjs/engine'

import { SceneIntro } from '../../scene-intro'
import { EarthMesh } from './earth-mesh'

@Actor({
  meshes: [EarthMesh]
})
export class EarthActor extends ActorInterface<MeshInterface> {
  @ActorComposition('Earth')
  compose(scene: SceneIntro) {
    Logger.trace('aki ActorComposition earth', this)
    const body = this.setBody(EarthMesh)
  }

  onSpawn(scene: KJS.Scene) {
    Logger.trace('aki ActorEarth onSpawn', this)
    this.useComposition('Earth')
    // this.useComposition(this.)
    // this.body  // 8a8f this should get the type from composition.setBody constructor argument.
    // this.transform.
  }
}
