import * as BABYLON from '@babylonjs/core'
import {
  ActorConstructor,
  Logger,
  ParticleConstructor,
  ParticleSourceConstructor,
  Rect,
  Scene,
  SceneInterface,
  Sprite,
  SpriteConstructor
} from '@khanonjs/engine'
import { Core } from '@khanonjs/engine/core'

import { EarthActor } from './actors/earth/earth-actor'
import { LogoActor } from './actors/logo-actor'
import { RobocilloActor } from './actors/robocillo/robocillo-actor'
import { SunActor } from './actors/sun-actor'
import { updateRatio } from './canvas-ratio-consts'
import { SceneIntroState } from './scene-intro-state'

@Scene({
  actors: [
    EarthActor,
    SunActor,
    LogoActor,
    RobocilloActor
  ],
  states: [
    SceneIntroState
  ],
  configuration: {
    clearColor: new BABYLON.Color4(0.25, 0.25, 0.25, 1.0)
  }
})
export class SceneIntro extends SceneInterface {
  private light: BABYLON.HemisphericLight

  onLoaded(): void {
    this.light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 0, 0), this.babylon.scene)
    updateRatio(Core.canvasRect)
  }

  onCanvasResize(size: Rect): void {
    updateRatio(size)
  }
}
