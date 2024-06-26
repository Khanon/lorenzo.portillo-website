import {
  Logger,
  Rect,
  SceneState,
  SceneStateInterface,
  UseCamera
} from '@khanonjs/engine'

import { EarthActor } from '../actors/earth/earth-actor'
import { SunActor } from '../actors/sun-actor/sun-actor'
import { SceneIntroCamera } from '../scene-intro-camera'

@SceneState({
  camera: SceneIntroCamera,
  useCamera: UseCamera.ON_START
})
export class SceneStateIntro extends SceneStateInterface {
  onStart() {
    this.scene.spawn.actor(EarthActor)
    this.scene.spawn.actor(SunActor)
  }

  // onLoopUpdate(delta: number): void {
  //   Logger.trace('aki onLoopUpdate', delta)
  // }

  // onCanvasResize(size: Rect): void {
  //   Logger.trace('aki onCanvasResize', size)
  // }
}
