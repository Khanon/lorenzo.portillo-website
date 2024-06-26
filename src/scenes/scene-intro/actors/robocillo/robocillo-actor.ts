import {
  Actor,
  ActorInterface,
  Logger,
  SpriteInterface
} from '@khanonjs/engine'

import { RobocilloSprite } from './robocillo-sprite'

@Actor({
  sprites: [RobocilloSprite]
})
export class RobocilloActor extends ActorInterface<SpriteInterface> {
  onLoaded(): void {
    // Logger.trace('aki ActorRobocillo onLoaded')
  }
}
