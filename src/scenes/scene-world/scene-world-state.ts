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
    url: '/assets/scene-world/meshes/character/character-test-monster-opt.glb',
    animations: [
      { id: 'OldMan', loop: true },
      {
        id: 'Walking',
        loop: true,
        keyFrames: [
          { id: 'middle', frames: [32] },
          { id: 'end', frames: [63] }
        ]
      }
    ],
    cloneByInstances: true
  }) monster1: MeshConstructor

  onStart() {
    this.switchCamera(SceneWorldCamera, {})
    /* const peasant = this.scene.spawn.mesh(this.peasant, 2, (mesh, index) => {
      mesh.position.z -= (index + 1) * 0.3
      mesh.playAnimation(index === 0 ? 'Taunt' : 'Dying')
    })
    const monster = this.scene.spawn.mesh(this.monster, 2, (mesh, index) => {
      mesh.position.z += (index + 1) * 0.3
      mesh.playAnimation(index === 0 ? 'OldMan' : 'Walking')
    }) */

    const monster1 = this.scene.spawn.mesh(this.monster1, 2, (mesh, index) => {
      // mesh.position.z += (index + 4) * 0.3
      mesh.rotate(BABYLON.Axis.Y, index * -Math.PI, BABYLON.Space.WORLD)
      mesh.playAnimation('Walking', {
        // loop: true,
        speedRatio: 1 - (0.8 * index)
      }, () => { Logger.trace('aki completed!') })
      Logger.trace('aki keyframes', index)
      mesh.subscribeToKeyframe('middle', () => {
        Logger.trace('aki MIDDLE!', index)
      })
      mesh.subscribeToKeyframe('end', () => {
        Logger.trace('aki END!', index)
      })
    })
  }
}
