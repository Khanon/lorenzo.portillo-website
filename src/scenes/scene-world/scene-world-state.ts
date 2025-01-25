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
    url: '/assets/scene-world/meshes/character/character-test-peasant.glb',
    animations: [
      { id: 'Breathe', loop: true },
      { id: 'Dying', loop: true },
      { id: 'Taunt', loop: true },
      { id: 'Thriller', loop: true },
      { id: 'Walking', loop: true }

    ]
  }) peasant: MeshConstructor

  @Mesh({
    url: '/assets/scene-world/meshes/character/character-test-monster.glb',
    animations: [
      { id: 'OldMan', loop: true },
      { id: 'Walking', loop: true }
    ]
  }) monster: MeshConstructor

  @Mesh({
    url: '/assets/scene-world/meshes/character/character-test-monster.glb',
    animations: [
      { id: 'OldMan', loop: true },
      { id: 'Walking', loop: true }
    ],
    cloneByInstances: true
  }) monster1: MeshConstructor

  onStart() {
    this.switchCamera(SceneWorldCamera, {})
    const peasant = this.scene.spawn.mesh(this.peasant, 2, (mesh, index) => {
      mesh.position.z -= (index + 1) * 0.3
      mesh.playAnimation(index === 0 ? 'Taunt' : 'Dying')
    })
    const monster = this.scene.spawn.mesh(this.monster, 2, (mesh, index) => {
      mesh.position.z += (index + 1) * 0.3
      mesh.playAnimation(index === 0 ? 'OldMan' : 'Walking')
    })

    const monster1 = this.scene.spawn.mesh(this.monster1, 2, (mesh, index) => {
      mesh.position.z += (index + 4) * 0.3
      mesh.playAnimation(index === 0 ? 'Walking' : 'OldMan', {
        loop: false,
        speedRatio: 0.1
      }, () => { Logger.trace('aki completed!') })
    })
  }
}
