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
export class SceneWorldCameraStateMove extends CameraStateInterface {
  @InputEvent({
    id: InputEventIds.DRAG
  }) onDrag(event: BABYLON.IPointerEvent) {
    this.camera.rotation.x += event.movementY * 0.001
    this.camera.rotation.y += event.movementX * 0.001
  }
}
