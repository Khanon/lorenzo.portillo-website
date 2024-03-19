import {
  ActorConstructor,
  Logger,
  ParticleConstructor,
  ParticleSourceConstructor,
  Scene,
  SceneInterface
} from '@khanonjs/engine'

import { ActorRobocillo } from './actors/robocillo/robocillo-actor'

@Scene({
  actors: [ActorRobocillo]
})
export class SceneIntro extends SceneInterface {
  onLoad(): void {
    Logger.trace('aki SCENE INTRO onLoad')
  }
}
