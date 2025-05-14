import * as BABYLON from '@babylonjs/core'
import {
  Camera,
  CameraInterface,
  KJS,
  Logger,
  Rect
} from '@khanonjs/engine'

import {
  END_RATIO_CANVAS,
  MIDDLE_RATIO_CANVAS
} from './canvas-ratio-consts'

@Camera()
export class SceneIntroCamera extends CameraInterface {
  paramsRatio0CameraPos = new BABYLON.Vector3(-430, 0, 0)
  paramsRatio1CameraPos = new BABYLON.Vector3(-200, 58, 0)

  onInitialize(scene: BABYLON.Scene) {
    // Fixed camera
    const camera = new BABYLON.UniversalCamera('camera intro', new BABYLON.Vector3(0, 0, 0), scene)
    camera.target = new BABYLON.Vector3(1, 0, 0)
    camera.inputs.clear()
    camera.minZ = 0.01

    return camera
  }

  onCanvasResize(size: Rect): void {
    // Camera responsive, MIDDLE_RATIO_CANVAS is ratio = 0; END_RATIO_CANVAS is ratio = 1
    const canvasRatio = size.width / size.height
    const factorCamera = 1 / (END_RATIO_CANVAS - MIDDLE_RATIO_CANVAS)
    const ratioCamera = (canvasRatio - MIDDLE_RATIO_CANVAS) * factorCamera
    this.babylon.camera.position = KJS.Vectors.dragPoint(ratioCamera, this.paramsRatio0CameraPos, this.paramsRatio1CameraPos)
  }
}
