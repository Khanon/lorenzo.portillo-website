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

@Scene({
  actors: [
    ActorRobocillo,
    ActorLogo
  ]
})
export class SceneIntro extends SceneInterface {
  onLoad(): void {
    Logger.trace('aki SCENE INTRO onLoad')
  }
}
