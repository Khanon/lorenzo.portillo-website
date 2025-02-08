import * as BABYLON from '@babylonjs/core'
import * as BABYLONGUI from '@babylonjs/gui'
import {
  GUI,
  GUIInterface,
  Logger,
  Rect
} from '@khanonjs/engine'

@GUI()
export class SceneWorldGUI extends GUIInterface {
  onInitialize(container: BABYLONGUI.AdvancedDynamicTexture) {
    Logger.trace('aki SceneWorldGUI onInitialize')
    const button1 = BABYLONGUI.Button.CreateSimpleButton('but1', 'Click Me')
    button1.width = '150px'
    button1.height = '40px'
    button1.color = 'white'
    button1.cornerRadius = 20
    button1.background = 'green'
    button1.onPointerUpObservable.add(function() {
      alert('you did it!')
    })
    container.addControl(button1)
  }

  onDestroy(): void {
    Logger.trace('aki SceneWorldGUI onDestroy')
  }

  onLoopUpdate(delta: number): void {
    // Logger.trace('aki SceneWorldGUI onLoopUpdate')
  }

  onCanvasResize(rect: Rect): void {
    // Logger.trace('aki SceneWorldGUI onCanvasResize')
  }
}
