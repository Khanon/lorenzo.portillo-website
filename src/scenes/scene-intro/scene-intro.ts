import { Vector3 } from '@babylonjs/core'
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight'
import { Color4 } from '@babylonjs/core/Maths/math.color'
import {
  ActorConstructor,
  Logger,
  ParticleConstructor,
  ParticleSourceConstructor,
  Scene,
  SceneInterface
} from '@khanonjs/engine'

import { ActorEarth } from './actors/earth/earth-actor'
import { ActorLogo } from './actors/logo/logo-actor'
import { ActorRobocillo } from './actors/robocillo/robocillo-actor'
import { SceneStateIntro } from './states/scene-state-intro'

@Scene({
  actors: [
    ActorEarth,
    ActorRobocillo,
    ActorLogo
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
    Logger.trace('aki SceneIntro onLoaded')
    this.light = new HemisphericLight('light', new Vector3(1, 0, 0), this.babylon.scene)
  }
}
