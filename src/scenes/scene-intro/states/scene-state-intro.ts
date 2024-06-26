import {
  Logger,
  Rect,
  SceneState,
  SceneStateInterface,
  SceneType,
  UseCamera
} from '@khanonjs/engine'

import { EarthActor } from '../actors/earth/earth-actor'
import { SceneIntroCamera } from '../scene-intro-camera'

@SceneState({
  camera: SceneIntroCamera,
  useCamera: UseCamera.ON_START
})
export class SceneStateIntro extends SceneStateInterface {
  onStart() {
    Logger.trace('aki SceneStateIntro onStart')
    const actor = this.scene.spawn.actor<EarthActor>(EarthActor, '')
    actor.compositions // 8a8f
  }

  onLoopUpdate(delta: number): void {
    // Logger.trace('aki onLoopUpdate', delta)
  }

  onCanvasResize(size: Rect): void {
    Logger.trace('aki onCanvasResize', size)
  }
}
