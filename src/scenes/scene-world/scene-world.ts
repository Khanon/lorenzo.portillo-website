import * as BABYLON from '@babylonjs/core'
import {
  Logger,
  Mesh,
  MeshConstructor,
  Scene,
  SceneInterface,
  Sprite,
  SpriteConstructor
} from '@khanonjs/engine'

import { SceneWorldGUI1 } from './scene-world-gui-1'
import { SceneWorldGUI2 } from './scene-world-gui-2'
import { SceneWorldState } from './scene-world-state'

@Scene({
  url: './assets/scene-world/meshes/test-scene/test-scene.glb',
  states: [
    SceneWorldState
  ],
  guis: [
    SceneWorldGUI1,
    SceneWorldGUI2
  ],
  configuration: {
    clearColor: new BABYLON.Color4(0.25, 0.25, 0.25, 1.0)
  }
})
export class SceneWorld extends SceneInterface {
  light1: BABYLON.HemisphericLight

  onLoaded() {
    this.light1 = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 0, 0), this.babylon.scene)
  }

  onStart() {
  }
}
