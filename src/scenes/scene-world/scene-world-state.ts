/* eslint-disable camelcase */
import * as BABYLON from '@babylonjs/core'
import {
  KJS,
  Logger,
  Mesh,
  MeshConstructor,
  SceneAction,
  SceneState,
  SceneStateInterface,
  Sprite,
  SpriteConstructor
} from '@khanonjs/engine'

import { Warrok } from './actors/warrok'
import { SceneWorldCamera } from './scene-world-camera'
import { SceneWorldGUI1 } from './scene-world-gui-1'
import { SceneWorldGUI2 } from './scene-world-gui-2'

@SceneState({
  actors: [
    Warrok
  ]
})
export class SceneWorldState extends SceneStateInterface {
  /* @Mesh({
    url: '/assets/scene-world/meshes/character/character-test-peasant.glb',
    animations: [
      { id: 'Breathe', loop: true },
      { id: 'Dying', loop: false },
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
  }) monster1: MeshConstructor */

  onStart() {
    this.switchCamera(SceneWorldCamera, {})

    this.spawn.actor(Warrok)
    /* const peasant = this.scene.spawn.mesh(this.peasant, 2, (mesh, index) => {
      mesh.position.z -= (index + 1) * 0.3
      mesh.playAnimation(index === 0 ? 'Taunt' : 'Dying')
    }) */

    /* const peasant = this.scene.spawn.mesh(this.peasant)
    const idleToRandomAnimation = () => {
      const maxIdleLoops = 3
      let idleRepeat = Math.ceil(Math.random() * maxIdleLoops)
      // Play idle in loop
      peasant.playAnimation('Breathe', { loop: true, speedRatio: 20.0 },
        () => {
          --idleRepeat
          if (idleRepeat === 0) {
            // When the loop is completed, play from random list
            peasant.playAnimation('Dying', { speedRatio: 5.0 },
              () => {
                // On complete, start again
                idleToRandomAnimation()
              })
          }
        })
    }
    idleToRandomAnimation() */

    /* const monster = this.scene.spawn.mesh(this.monster, 2, (mesh, index) => {
      mesh.position.z += (index + 1) * 0.3
      mesh.playAnimation(index === 0 ? 'OldMan' : 'Walking')
    })

    const monster1 = this.scene.spawn.mesh(this.monster1, 2, (mesh, index) => {
      const i = index
      // mesh.position.z += (index + 4) * 0.3
      mesh.rotate(BABYLON.Axis.Y, index * -Math.PI, BABYLON.Space.WORLD)
      mesh.playAnimation('Walking', {
        // loop: true,
        speedRatio: 1 - (0.8 * index)
      })
    }) */
  }
}
