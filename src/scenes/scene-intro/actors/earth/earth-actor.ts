import {
  Actor,
  ActorComposition,
  ActorCompositionDefinition,
  ActorInterface,
  KJS,
  Logger,
  SceneType
} from '@khanonjs/engine'

import { EarthMesh } from './earth-mesh'

const compositionId: string = 'Earth'

@Actor({
  meshes: [EarthMesh]
})
export class ActorEarth extends ActorInterface {
  @ActorComposition(compositionId)
  compose(composition: ActorCompositionDefinition, scene: SceneType) {
    Logger.trace('aki ActorComposition earth')
    composition.addMesh(EarthMesh)
  }

  onSpawn(scene: KJS.Scene) {
    Logger.trace('aki ActorEarth onSpawn', this)
    this.useComposition(compositionId)
  }
}
