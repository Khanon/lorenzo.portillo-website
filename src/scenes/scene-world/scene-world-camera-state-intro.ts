import * as BABYLON from '@babylonjs/core'
/* eslint-disable camelcase */
import {
  CameraState,
  CameraStateInterface,
  InputEvent,
  InputEventIds,
  Logger
} from '@khanonjs/engine'

@CameraState()
export class SceneWorldCameraStateIntro extends CameraStateInterface {}
