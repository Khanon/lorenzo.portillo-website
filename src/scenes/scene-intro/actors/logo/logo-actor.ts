import {
  Actor,
  ActorInterface,
  SpriteInterface
} from '@khanonjs/engine'

import { LogoSprite } from './logo-sprite'

@Actor({
  sprites: [LogoSprite]
})
export class LogoActor extends ActorInterface<SpriteInterface> {
  onLoaded(): void {
    // console.log('aki ActorLogo onLoaded')
  }
}
