import {
  Actor2D,
  Actor2DInterface
} from '@khanonjs/engine'

import { SpriteLogo } from './logo-sprite'

@Actor2D({
  sprites: [SpriteLogo]
})
export class ActorLogo extends Actor2DInterface {
  onLoaded(): void {
    // console.log('aki ActorLogo onLoaded')
  }
}
