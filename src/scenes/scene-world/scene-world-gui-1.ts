import * as BABYLON from '@babylonjs/core'
import * as BABYLONGUI from '@babylonjs/gui'
import {
  GUI,
  GUIInterface,
  Logger,
  Rect
} from '@khanonjs/engine'

@GUI()
export class SceneWorldGUI1 extends GUIInterface {
  onInitialize(container: BABYLONGUI.AdvancedDynamicTexture) {
    // Logger.trace('SceneWorldGUI onInitialize')
    const button1 = BABYLONGUI.Button.CreateSimpleButton('but1', 'Click Me ONE')
    button1.horizontalAlignment = BABYLONGUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    button1.width = '150px'
    button1.height = '40px'
    button1.color = 'white'
    button1.cornerRadius = 20
    button1.background = 'green'
    button1.onPointerUpObservable.add(function() {
      alert('you did it ONE!')
    })
    container.addControl(button1)
  }

  onDestroy(): void {
    // Logger.trace('SceneWorldGUI onDestroy')
  }

  onLoopUpdate(delta: number): void {
    // Logger.trace('SceneWorldGUI onLoopUpdate')
  }

  onCanvasResize(rect: Rect): void {
    // Logger.trace('SceneWorldGUI onCanvasResize')
  }
}
