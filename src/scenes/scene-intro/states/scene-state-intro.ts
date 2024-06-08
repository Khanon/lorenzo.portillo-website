import {
  SceneState,
  SceneStateInterface,
  UseCamera
} from '@khanonjs/engine'

import { SceneIntroCamera } from '../scene-intro-camera'

@SceneState({
  camera: SceneIntroCamera,
  useCamera: UseCamera.ON_START
})
export class SceneStateIntro extends SceneStateInterface {

}
