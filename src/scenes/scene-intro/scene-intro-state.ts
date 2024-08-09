import {
  KJS,
  Logger,
  SceneState,
  SceneStateInterface
} from '@khanonjs/engine'

import { EarthActor } from './actors/earth/earth-actor'
import { LogoActor } from './actors/logo-actor'
import { RobocilloStateIntro } from './actors/robocillo/robocilllo-state-intro'
import { RobocilloActor } from './actors/robocillo/robocillo-actor'
import { SunActor } from './actors/sun-actor'
import { SceneIntroCamera } from './scene-intro-camera'

@SceneState()
export class SceneIntroState extends SceneStateInterface {
  onStart() {
    this.setCamera(SceneIntroCamera, {})
    const earth = this.scene.spawn.actor(EarthActor)
    const sun = this.scene.spawn.actor(SunActor)
    const logo = this.scene.spawn.actor(LogoActor)
    const robocillo = this.scene.spawn.actor(RobocilloActor)
    robocillo.earth = earth
    KJS.setTimeout(() => robocillo.startState(RobocilloStateIntro, {}), 2000)
  }

  // onLoopUpdate(delta: number): void {
  //   Logger.trace('aki onLoopUpdate', delta)
  // }

  // onCanvasResize(size: Rect): void {
  //   Logger.trace('aki onCanvasResize', size)
  // }
}
