import {
  Actor2D,
  Actor2DInterface
} from '@khanonjs/engine'

import { Actors } from '../../actors'
import { SpriteRobocillo } from './robocillo-sprite'

@Actor2D({
  name: Actors.Robocillo,
  sprites: [SpriteRobocillo]
})
export class ActorRobocillo extends Actor2DInterface {
  onLoaded(): void {
    console.log('aki ActorRobocillo onLoaded')
  }
}
