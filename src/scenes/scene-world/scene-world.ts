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

import { SceneWorldState } from './scene-world-state'

@Scene({
  states: [
    SceneWorldState
  ],
  configuration: {
    clearColor: new BABYLON.Color4(0.25, 0.25, 0.25, 1.0)
  }
})
export class SceneWorld extends SceneInterface {
  @Mesh({
    url: '/assets/scene-world/meshes/peasant/amature.babylon',
    meshId: 'Peasant_girl'
  }) world: MeshConstructor

  light1: BABYLON.HemisphericLight

  onLoaded() {
    this.light1 = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 0, 0), this.babylon.scene)
  }

  onStart() {
  }
}
