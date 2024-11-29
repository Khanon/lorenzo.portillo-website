import {
  AppState,
  AppStateInterface,
  KJS
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
    KJS.Scene.start(SceneIntro, SceneIntroState, {})
  }
}
