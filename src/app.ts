import {
  App,
  AppInterface,
  KJS,
  Logger
} from '@khanonjs/engine'

import { AppStateIntro } from './app-state-intro'
import { AppStateWorld } from './app-state-world'
import { SceneIntro } from './scenes/scene-intro/scene-intro'
import { SceneIntroState } from './scenes/scene-intro/scene-intro-state'
import { SceneWorld } from './scenes/scene-world/scene-world'
import { SceneWorldState } from './scenes/scene-world/scene-world-state'

@App({
  name: 'Lorenzo Portillo Website',
  loopUpdate: {
    fps: 165
  },
  removeTimeoutsOnStateSwitch: true
})
export class LPWebsite extends AppInterface {
  onStart() {
    this.switchState(AppStateIntro, {})
  }

  onClose() {
    Logger.trace('App onClose')
  }

  onError(error?: string) {
    Logger.error('App onError:', error)
  }
}
