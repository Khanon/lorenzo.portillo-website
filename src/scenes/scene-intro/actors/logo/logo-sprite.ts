import {
  KJS,
  Logger,
  Sprite,
  SpriteInterface
} from '@khanonjs/engine'

@Sprite({
  url: './assets/scene-intro/sprites/logo.png'
})
export class SpriteLogo extends SpriteInterface {
  onLoaded(scene: KJS.Scene) {
    Logger.trace('aki SpriteLogo onLoaded', (scene as any).constructor.prototype)
  }
}
