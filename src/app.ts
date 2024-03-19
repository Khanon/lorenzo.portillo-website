import {
  App,
  AppInterface,
  KJS,
  Logger
} from '@khanonjs/engine'

import { SceneIntro } from './scenes/scene-intro/scene-intro'
import { SceneWorld } from './scenes/scene-world/scene-world'

@App({
  name: 'Lorenzo Portillo Website'
})
class LPWebsite implements AppInterface {
  onStart() {
    Logger.info('App onStart')
    KJS.Scene.load(SceneIntro)
  }

  onClose() {
    KJS.Scene.load(SceneWorld)
    Logger.info('App onClose')
  }

  onError(error?: any) {
    Logger.error('App onError:', error)
  }
}
