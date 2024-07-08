import {
  Actor,
  ActorInterface,
  ActorSprite,
  SpriteInterface
} from '@khanonjs/engine'

@Actor()
export class LogoActor extends ActorInterface<SpriteInterface> {
  @ActorSprite({
    url: './assets/scene-intro/sprites/logo.png',
    cellWidth: 402,
    cellHeight: 83
  })

  onLoaded(): void {
    // console.log('aki ActorLogo onLoaded')
  }
}
