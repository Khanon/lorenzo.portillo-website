import {
  Logger,
  Scene,
  SceneInterface
} from '@khanonjs/engine'

@Scene({
})
export class SceneWorld extends SceneInterface {
  onLoad(): void {
    Logger.trace('aki SCENE WORLD onLoad')
  }
}
