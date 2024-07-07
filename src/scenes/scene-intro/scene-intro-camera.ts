import { UniversalCamera } from '@babylonjs/core'
import { Vector3 } from '@babylonjs/core/Maths/math'
import {
  BabylonScene,
  Camera,
  CameraInterface,
  Rect
} from '@khanonjs/engine'
import { Vectors } from '@khanonjs/engine/modules/helper/vectors'

import {
  END_RATIO_CANVAS,
  MIDDLE_RATIO_CANVAS
} from './canvas-ratio-consts'

@Camera()
export class SceneIntroCamera extends CameraInterface {
  paramsRatio0CameraPos = new Vector3(-430, 0, 0)
  paramsRatio1CameraPos = new Vector3(-200, 58, 0)

  initialize(scene: BabylonScene) {
    // Fixed camera
    const camera = new UniversalCamera('camera', new Vector3(0, 0, 0), scene)
    camera.target = new Vector3(1, 0, 0)
    camera.inputs.clear()
    camera.minZ = 0.01 // Let it go closer to the earth (reduce distance with near clipping plane)
    return camera
  }

  onCanvasResize(size: Rect): void {
    // Camera responsive, this.MIDDLE_RATIO_CANVAS is ratio = 0; this.END_RATIO_CANVAS is ratio = 1
    const canvasRatio = size.width / size.height
    const factorCamera = 1 / (END_RATIO_CANVAS - MIDDLE_RATIO_CANVAS)
    const ratioCamera = (canvasRatio - MIDDLE_RATIO_CANVAS) * factorCamera
    this.babylon.camera.position = Vectors.dragPoint(ratioCamera, this.paramsRatio0CameraPos, this.paramsRatio1CameraPos)
  }
}
