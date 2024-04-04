import {
  Sprite,
  SpriteInterface
} from '@khanonjs/engine'

@Sprite({
  url: './assets/scene-intro/sprites/robocillo.png'
})
export class SpriteRobocillo extends SpriteInterface {
  onLoaded(sceneName: string) {
    console.log('aki SpriteRobocillo onLoaded sceneName', sceneName)
  }
}
