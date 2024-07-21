import {
  Logger,
  SceneState,
  SceneStateInterface,
  UseCamera
} from '@khanonjs/engine'

import { EarthActor } from './actors/earth/earth-actor'
import { LogoActor } from './actors/logo-actor'
import { RobocilloStateIntro } from './actors/robocillo/robocilllo-state-intro'
import { RobocilloActor } from './actors/robocillo/robocillo-actor'
import { SunActor } from './actors/sun-actor'
import { SceneIntroCamera } from './scene-intro-camera'

@SceneState({
  camera: SceneIntroCamera,
  useCamera: UseCamera.ON_START
})
export class SceneIntroState extends SceneStateInterface {
  onStart() {
    const earth = this.scene.spawn.actor(EarthActor)
    this.scene.spawn.actor(SunActor)
    this.scene.spawn.actor(LogoActor)
    const robocillo = this.scene.spawn.actor(RobocilloActor)
    robocillo.earth = earth
    robocillo.startState(RobocilloStateIntro)
  }

  // onLoopUpdate(delta: number): void {
  //   Logger.trace('aki onLoopUpdate', delta)
  // }

  // onCanvasResize(size: Rect): void {
  //   Logger.trace('aki onCanvasResize', size)
  // }
}
