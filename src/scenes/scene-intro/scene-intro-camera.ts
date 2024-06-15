import { UniversalCamera } from '@babylonjs/core'
import { Vector3 } from '@babylonjs/core/Maths/math'
import {
  BabylonScene,
  Camera,
  CameraInterface
} from '@khanonjs/engine'

@Camera()
export class SceneIntroCamera extends CameraInterface {
  initialize(scene: BabylonScene) {
    // Fixed camera
    const camera = new UniversalCamera('camera', new Vector3(0, 0, 0), scene)
    camera.target = new Vector3(1, 0, 0)
    camera.inputs.clear()
    camera.minZ = 0.01 // Let it go closer to the earth (reduce distance with near clipping plane)
    // camera.attachControl(this.canvas, true)  // 8a8f
    return camera
  }
}
