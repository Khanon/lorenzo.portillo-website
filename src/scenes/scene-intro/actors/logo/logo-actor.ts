import {
  Actor2D,
  Actor2DInterface
} from '@khanonjs/engine'

import { Actors } from '../../actors'
import { SpriteLogo } from './logo-sprite'

@Actor2D({
  name: Actors.Logo,
  sprites: [SpriteLogo]
})
export class ActorLogo extends Actor2DInterface {
  onLoaded(): void {
    console.log('aki ActorLogo onLoaded')
  }
}
