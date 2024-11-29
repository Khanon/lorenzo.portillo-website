/* eslint-disable camelcase */
import * as BABYLON from '@babylonjs/core'
import {
  KJS,
  Logger,
  SceneAction,
  SceneState,
  SceneStateInterface
} from '@khanonjs/engine'

import { SceneWorldCamera } from './scene-world-camera'

@SceneState({
  actors: [
  ]
})
export class SceneWorldState extends SceneStateInterface {
  onStart() {
    this.switchCamera(SceneWorldCamera, {})
  }

  // onLoopUpdate(delta: number): void {
  //   Logger.trace('aki onLoopUpdate', delta)
  // }

  // onCanvasResize(size: Rect): void {
  //   Logger.trace('aki onCanvasResize', size)
  // }
}
