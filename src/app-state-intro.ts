import {
  AppState,
  AppStateInterface,
  KJS,
  Logger
} from '@khanonjs/engine'

import { SceneIntro } from './scenes/scene-intro/scene-intro'
import { SceneIntroState } from './scenes/scene-intro/scene-intro-state'

@AppState({
  scenes: [
    SceneIntro
  ]
})
export class AppStateIntro extends AppStateInterface {
  onStart() {
    Logger.trace('AppStateIntro onStart')
    KJS.Scene.start(SceneIntro, SceneIntroState, {})
  }
}
