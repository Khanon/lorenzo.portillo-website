import {
  App,
  AppInterface,
  KJS,
  Logger
} from '@khanonjs/engine'

import { SceneIntro } from './scenes/scene-intro/scene-intro'
import { SceneStateIntro } from './scenes/scene-intro/states/scene-state-intro'
import { SceneWorld } from './scenes/scene-world/scene-world'

@App({
  name: 'Lorenzo Portillo Website'
})
class LPWebsite implements AppInterface {
  onStart() {
    // Logger.trace('App onStart')
    const progressIntro = KJS.Scene.load(SceneIntro)
    const progressWorld = KJS.Scene.load(SceneWorld)

    progressIntro.onComplete.add(() => {
      // Logger.trace('aki SceneIntro loaded!')
      KJS.Scene.start(SceneIntro, SceneStateIntro)
    })
    progressIntro.onProgress.add((progress: number) => {
      // Logger.trace('aki SceneIntro progress', progress)
    })
    progressIntro.onError.add(() => {
      // Logger.trace('aki SceneIntro error :(')
    })

    progressWorld.onComplete.add(() => {
      // Logger.trace('aki SceneWorld loaded!')
    })
    progressWorld.onProgress.add((progress: number) => {
      // Logger.trace('aki SceneWorld progress', progress)
    })
    progressWorld.onError.add(() => {
      // Logger.trace('aki SceneWorld error :(')
    })
  }

  onClose() {
    Logger.trace('App onClose')
  }

  onError(error?: string) {
    Logger.error('App onError:', error)
  }
}
