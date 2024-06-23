import {
  Actor,
  ActorInterface,
  Logger
} from '@khanonjs/engine'

import { RobocilloSprite } from './robocillo-sprite'

@Actor({
  sprites: [RobocilloSprite]
})
export class RobocilloActor extends ActorInterface {
  onLoaded(): void {
    // Logger.trace('aki ActorRobocillo onLoaded')
  }
}
