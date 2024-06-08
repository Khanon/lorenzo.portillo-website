import {
  ActorConstructor,
  Logger,
  ParticleConstructor,
  ParticleSourceConstructor,
  Scene,
  SceneInterface
} from '@khanonjs/engine'

import { ActorLogo } from './actors/logo/logo-actor'
import { ActorRobocillo } from './actors/robocillo/robocillo-actor'
import { SceneStateIntro } from './states/scene-state-intro'

@Scene({
  actors: [
    ActorRobocillo,
    ActorLogo
  ],
  states: [
    SceneStateIntro
  ]
})
export class SceneIntro extends SceneInterface {
  custom: string

  onLoad(): void {
    Logger.trace('aki SCENE INTRO onLoad')
  }
}
