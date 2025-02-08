import * as BABYLON from '@babylonjs/core'
import {
  KJS,
  Logger,
  Rect,
  Scene,
  SceneInterface
} from '@khanonjs/engine'

import { LPWebsite } from '../../app'
import { updateRatio } from './canvas-ratio-consts'
import { SceneIntroGUI } from './scene-intro-gui'
import { SceneIntroState } from './scene-intro-state'

@Scene({
  states: [
    SceneIntroState
  ],
  guis: [
    SceneIntroGUI
  ],
  configuration: {
    clearColor: new BABYLON.Color4(0.25, 0.25, 0.25, 1.0)
  }
})
export class SceneIntro extends SceneInterface {
  private light: BABYLON.HemisphericLight | undefined

  onLoaded(): void {
    // this.light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 0, 0), this.babylon.scene)
    // this.light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(-1, 0, 0), this.babylon.scene)
    // this.light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), this.babylon.scene)
    // this.light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, -1, 0), this.babylon.scene)
    updateRatio(KJS.getCanvasRect())
  }

  onUnload(): void {
    this.light?.dispose()
    this.light = undefined
  }

  onCanvasResize(size: Rect): void {
    updateRatio(size)
  }
}
