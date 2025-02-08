import * as BABYLON from '@babylonjs/core'
import * as BABYLONGUI from '@babylonjs/gui'
import {
  GUI,
  GUIInterface,
  Logger,
  Rect
} from '@khanonjs/engine'

@GUI()
export class SceneIntroGUI extends GUIInterface {
  onInitialize(container: BABYLONGUI.AdvancedDynamicTexture) {
    Logger.trace('aki SceneIntroGUI onInitialize')
    const button1 = BABYLONGUI.Button.CreateSimpleButton('but1', 'Click Me')
    button1.left = '400px'
    button1.width = '150px'
    button1.height = '40px'
    button1.color = 'white'
    button1.cornerRadius = 20
    button1.background = 'red'
    button1.onPointerUpObservable.add(function() {
      alert('you did it!')
    })
    container.addControl(button1)
  }

  onDestroy(): void {
    Logger.trace('aki SceneIntroGUI onDestroy')
  }

  onLoopUpdate(delta: number): void {
    // Logger.trace('aki SceneIntroGUI onLoopUpdate')
  }

  onCanvasResize(rect: Rect): void {
    // Logger.trace('aki SceneIntroGUI onCanvasResize')
  }
}
