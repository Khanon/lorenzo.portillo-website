import {
  App,
  AppInterface,
  KJS,
  Logger
} from '@khanonjs/engine'

import { SceneIntro } from './scenes/scene-intro/scene-intro'

@App({
  name: 'Lorenzo Portillo Website'
})
class LPWebsite implements AppInterface {
  onStart() {
    Logger.info('App onStart')
    KJS.Scene.load(SceneIntro)
  }

  onClose() {
    Logger.info('App onClose')
  }

  onError(error?: any) {
    Logger.error('App onError:', error)
  }
}