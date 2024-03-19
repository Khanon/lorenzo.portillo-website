import {
  Actor2D,
  Actor2DInterface
} from '@khanonjs/engine'

import { SpriteRobocillo } from './robocillo-sprite'

@Actor2D({
  sprites: [SpriteRobocillo]
})
export class ActorRobocillo extends Actor2DInterface {
}
