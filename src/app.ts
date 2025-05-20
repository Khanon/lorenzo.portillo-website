import { Scene } from '@babylonjs/core'
import {
  App,
  AppInterface,
  Camera,
  CameraInterface,
  KJS,
  Logger,
  SceneState,
  SceneStateInterface
} from '@khanonjs/engine'
import { CamerasController } from '@khanonjs/engine/controllers'

import { AppStateIntro } from './app-state-intro'
import { AppStateWorld } from './app-state-world'
import { SceneIntro } from './scenes/scene-intro/scene-intro'
import { SceneIntroCamera } from './scenes/scene-intro/scene-intro-camera'
import { SceneIntroState } from './scenes/scene-intro/scene-intro-state'
import { SceneWorld } from './scenes/scene-world/scene-world'
import { SceneWorldCamera } from './scenes/scene-world/scene-world-camera'
import { SceneWorldState } from './scenes/scene-world/scene-world-state'

@App({
  name: 'Lorenzo Portillo Website',
  loopUpdate: {
    fps: 165
  }
})
export class LPWebsite extends AppInterface {
  onStart() {
    this.switchState(AppStateWorld, {})
    // this.switchState(AppStateIntro, {})
    // this.switchState(AppStateIntro, {}).onComplete.add(() => {
    /* setTimeout(() => {
      // KJS.Scene.stop(SceneIntro)
      this.switchState(AppStateIntro, {})
      setTimeout(() => {
        this.switchState(AppStateWorld, {})
        // KJS.Scene.start(SceneIntro, SceneIntroState, {})
        setTimeout(() => {
          this.switchState(AppStateIntro, {})
          // KJS.Scene.stop(SceneIntro)
          setTimeout(() => {
            this.switchState(AppStateWorld, {})
            // KJS.Scene.start(SceneIntro, SceneIntroState, {})
          }, 3000)
        }, 3000)
      }, 3000)
    }, 2000) */
    // })
  }

  onClose() {
    Logger.trace('App onClose')
  }

  onError(error?: string) {
    Logger.error('App onError:', error)
  }
}
