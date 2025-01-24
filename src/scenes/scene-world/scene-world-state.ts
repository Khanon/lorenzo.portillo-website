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
    url: '/assets/scene-world/meshes/character/character-test-peasant.glb'
  }) peasant: MeshConstructor

  @Mesh({
    url: '/assets/scene-world/meshes/character/character-test-monster.glb'
  }) monster: MeshConstructor

  onStart() {
    this.switchCamera(SceneWorldCamera, {})
    const peasant = this.scene.spawn.mesh(this.peasant, 2, (mesh, index) => {
      mesh.position.z -= (index + 1) * 0.3
    })
    const monster = this.scene.spawn.mesh(this.monster, 2, (mesh, index) => {
      mesh.position.z += (index + 1) * 0.3
    })

    // girl.scaling = new BABYLON.Vector3(0.01, 0.01, 0.01)
    // girl.rotate(BABYLON.Axis.X, -Math.PI / 2, BABYLON.Space.WORLD)
    // girl.rotate(BABYLON.Axis.Y, Math.PI / 2, BABYLON.Space.WORLD)
    // girl.playAnimation(0)
  }
}
