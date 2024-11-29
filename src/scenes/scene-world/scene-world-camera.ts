import * as BABYLON from '@babylonjs/core'
import {
  Camera,
  CameraInterface,
  Logger,
  Rect
} from '@khanonjs/engine'

@Camera()
export class SceneWorldCamera extends CameraInterface {
  paramsRatio0CameraPos = new BABYLON.Vector3(-430, 0, 0)
  paramsRatio1CameraPos = new BABYLON.Vector3(-200, 58, 0)

  onInitialize(scene: BABYLON.Scene) {
    // Fixed camera
    const camera = new BABYLON.UniversalCamera('camera', new BABYLON.Vector3(-10, 0, 0), this.babylon.scene)
    camera.target = new BABYLON.Vector3(1, 0, 0)
    camera.inputs.clear()
    // this.camera.minZ = 0.01; // Let it go closer to the earth (reduce distance with near clipping plane)

    return camera
  }

  onCanvasResize(size: Rect): void {
  }
}
