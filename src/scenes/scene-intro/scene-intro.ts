import {
  DefaultRenderingPipeline,
  Vector3
} from '@babylonjs/core' // 8a8f pasar a BABYLON
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight' // 8a8f pasar a BABYLON
import { Color4 } from '@babylonjs/core/Maths/math.color' // 8a8f pasar a BABYLON
import {
  ActorConstructor,
  Logger,
  ParticleConstructor,
  ParticleSourceConstructor,
  Rect,
  Scene,
  SceneInterface
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
    clearColor: new Color4(0.25, 0.25, 0.25, 1.0)
  }
})
export class SceneIntro extends SceneInterface {
  private light: HemisphericLight

  onLoaded(): void {
    this.light = new HemisphericLight('light', new Vector3(1, 0, 0), this.babylon.scene)
    updateRatio(Core.canvasRect)
  }

  onCanvasResize(size: Rect): void {
    updateRatio(size)
  }
}
