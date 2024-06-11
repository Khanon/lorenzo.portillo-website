import {
  KJS,
  Logger,
  Sprite,
  SpriteInterface
} from '@khanonjs/engine'

@Sprite({
  url: './assets/scene-intro/sprites/robocillo.png'
})
export class SpriteRobocillo extends SpriteInterface {
  onLoaded(scene: KJS.Scene) {
    // Logger.trace('aki SpriteRobocillo onLoaded', scene)
  }
}
