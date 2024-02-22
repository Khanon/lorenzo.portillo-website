import {
  App,
  AppInterface,
  Logger
} from '@khanonjs/engine'

@App({
  name: 'Lorenzo Portillo Website'
})
class LPWebsite implements AppInterface {
  onStart() {
    Logger.info('App onStart')
  }

  onClose() {
    Logger.info('App onClose')
  }

  onError(error?: any) {
    Logger.error('App onError:', error)
  }
}