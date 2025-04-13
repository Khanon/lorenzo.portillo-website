/* eslint-disable camelcase */
import {
  CameraState,
  CameraStateInterface,
  InputEvent,
  InputEventIds,
  Logger
} from '@khanonjs/engine'

@CameraState()
export class SceneWorldCameraStateIntro extends CameraStateInterface {
  @InputEvent({
    id: InputEventIds.MOUSE_MOVE
  }) onMove() {
    Logger.trace('aki MOUSE_MOVE', this.babylon.scene.isPointerCaptured())
  }

  @InputEvent({
    id: InputEventIds.DRAG
  }) onDrag() {
    Logger.trace('aki onDrag')
  }
}
