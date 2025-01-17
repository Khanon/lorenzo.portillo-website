/* eslint-disable camelcase */
import * as BABYLON from '@babylonjs/core'
import {
  KJS,
  Logger,
  Mesh,
  MeshConstructor,
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
  @Mesh({
    url: '/assets/scene-world/meshes/peasant/amature.babylon',
    meshId: 'Peasant_girl'
  }) world: MeshConstructor

  onStart() {
    this.switchCamera(SceneWorldCamera, {})
    const girl = this.scene.spawn.mesh(this.world)
    girl.scaling = new BABYLON.Vector3(0.01, 0.01, 0.01)
    girl.rotate(BABYLON.Axis.X, -Math.PI / 2, BABYLON.Space.WORLD)
    girl.rotate(BABYLON.Axis.Y, Math.PI / 2, BABYLON.Space.WORLD)
  }
}
