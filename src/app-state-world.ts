import {
  AppState,
  AppStateInterface,
  KJS,
  Logger
} from '@khanonjs/engine'

import { SceneWorld } from './scenes/scene-world/scene-world'
import { SceneWorldState } from './scenes/scene-world/scene-world-state'

@AppState({
  scenes: [
    SceneWorld
  ]
})
export class AppStateWorld extends AppStateInterface {
  onStart() {
    KJS.Scene.start(SceneWorld, SceneWorldState, {})
  }
}
