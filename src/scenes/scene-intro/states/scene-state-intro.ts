import {
  Logger,
  Rect,
  SceneState,
  SceneStateInterface,
  SceneType,
  UseCamera
} from '@khanonjs/engine'

import { EarthActor } from '../actors/earth/earth-actor'
import { EarthMesh } from '../actors/earth/earth-mesh'
import { SceneIntroCamera } from '../scene-intro-camera'

@SceneState({
  camera: SceneIntroCamera,
  useCamera: UseCamera.ON_START
})
export class SceneStateIntro extends SceneStateInterface {
  onStart() {
    Logger.trace('aki SceneStateIntro onStart')
    this.scene.spawn.actor(EarthActor)
  }

  onLoopUpdate(delta: number): void {
    // Logger.trace('aki onLoopUpdate', delta)
  }

  onCanvasResize(size: Rect): void {
    Logger.trace('aki onCanvasResize', size)
  }
}
