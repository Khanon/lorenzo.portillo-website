import {
  Logger,
  SceneInterface,
  Sprite,
  SpriteInterface
} from '@khanonjs/engine'

@Sprite({
  url: './assets/scene-intro/sprites/robocillo.png'
})
export class RobocilloSprite extends SpriteInterface {
  onLoaded(scene: SceneInterface) {
    // Logger.trace('aki SpriteRobocillo onLoaded', scene)
  }
}
