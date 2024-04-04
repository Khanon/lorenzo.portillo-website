import {
  ActorConstructor,
  Logger,
  ParticleConstructor,
  ParticleSourceConstructor,
  Scene,
  SceneInterface
} from '@khanonjs/engine'

import { Scenes } from '../scenes'

@Scene({
  name: Scenes.World
})
export class SceneWorld extends SceneInterface {
  onLoad(): void {
    Logger.trace('aki SCENE WORLD onLoad')
  }
}
