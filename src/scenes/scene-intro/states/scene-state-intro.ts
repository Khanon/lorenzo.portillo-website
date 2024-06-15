import {
  Logger,
  SceneState,
  SceneStateInterface,
  SceneType,
  UseCamera
} from '@khanonjs/engine'

import { ActorEarth } from '../actors/earth/earth-actor'
import { SceneIntroCamera } from '../scene-intro-camera'

@SceneState({
  camera: SceneIntroCamera,
  useCamera: UseCamera.ON_START
})
export class SceneStateIntro extends SceneStateInterface {
  onPlay() {
    Logger.trace('aki SceneStateIntro onPlay')
    this.scene.spawnActor(ActorEarth, (actor) => {
      Logger.trace('aki SceneStateIntro spawnActor initialize', actor)
    })
  }
}
