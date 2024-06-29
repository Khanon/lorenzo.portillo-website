import { Vector3 } from '@babylonjs/core'
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight'
import { Color4 } from '@babylonjs/core/Maths/math.color'
import {
  ActorConstructor,
  Logger,
  ParticleConstructor,
  ParticleSourceConstructor,
  Rect,
  Scene,
  SceneInterface
} from '@khanonjs/engine'

import { EarthActor } from './actors/earth/earth-actor'
import { LogoActor } from './actors/logo/logo-actor'
import { RobocilloActor } from './actors/robocillo/robocillo-actor'
import { SunActor } from './actors/sun-actor/sun-actor'
import { updateRatio } from './canvas-ratio-consts'
import { SceneStateIntro } from './states/scene-state-intro'

@Scene({
  actors: [
    EarthActor,
    SunActor
    // RobocilloActor,
    // LogoActor
  ],
  states: [
    SceneStateIntro
  ],
  configuration: {
    clearColor: new Color4(0.25, 0.25, 0.25, 1.0)
  }
})
export class SceneIntro extends SceneInterface {
  private light: HemisphericLight

  onLoaded(): void {
    this.light = new HemisphericLight('light', new Vector3(1, 0, 0), this.babylon.scene)
  }

  onCanvasResize(size: Rect): void {
    updateRatio(size)
  }
}
