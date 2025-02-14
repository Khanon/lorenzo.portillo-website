import {
  Actor,
  ActorInterface,
  Mesh,
  MeshInterface
} from '@khanonjs/engine'
import { MeshConstructor } from '@khanonjs/engine/decorators/mesh'

@Actor({
  spawnByReferenceId: 'Warrok'
})
export class Warrok extends ActorInterface<MeshInterface> {
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
    ]
  }) Mesh: MeshConstructor

  onSpawn() {
    // this.setBody(this.Mesh)
    // this.body.playAnimation('Walking')
  }

  onLoopUpdate(delta: number): void {
    // this.t.addRotation(0, 0.01, 0)
  }
}
