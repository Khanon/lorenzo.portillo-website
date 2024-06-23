import {
  Actor,
  ActorInterface
} from '@khanonjs/engine'

import { LogoSprite } from './logo-sprite'

@Actor({
  sprites: [LogoSprite]
})
export class LogoActor extends ActorInterface {
  onLoaded(): void {
    // console.log('aki ActorLogo onLoaded')
  }
}
