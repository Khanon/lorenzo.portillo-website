/* eslint-disable camelcase */
import * as BABYLON from '@babylonjs/core'
import {
  KJS,
  Logger,
  SceneAction,
  SceneState,
  SceneStateInterface,
  Sprite,
  SpriteConstructor
} from '@khanonjs/engine'

import { EarthActor } from './actors/earth/earth-actor'
import { LogoActor } from './actors/logo-actor'
import { RobocilloStateIntro } from './actors/robocillo/robocilllo-state-intro'
import { RobocilloActor } from './actors/robocillo/robocillo-actor'
import { SunActor } from './actors/sun-actor'
import { SceneIntroCamera } from './scene-intro-camera'

@SceneState({
  actors: [
    EarthActor,
    SunActor,
    LogoActor,
    RobocilloActor
  ]
})
export class SceneIntroState extends SceneStateInterface {
  onStart() {
    this.switchCamera(SceneIntroCamera, {})
    const earth = this.scene.spawn.actor(EarthActor)
    const sun = this.scene.spawn.actor(SunActor)
    const logo = this.scene.spawn.actor(LogoActor)

    const robocillo = this.scene.spawn.actor(RobocilloActor)
    robocillo.earth = earth
    KJS.setTimeout(() => robocillo.switchState(RobocilloStateIntro, {}), 2000)
  }
}
