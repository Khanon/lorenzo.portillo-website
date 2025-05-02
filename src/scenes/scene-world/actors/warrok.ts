import {
  Actor,
  ActorInterface,
  KJS,
  Logger,
  Mesh,
  MeshInterface,
  Sound,
  SoundConstructor
} from '@khanonjs/engine'
import { MeshConstructor } from '@khanonjs/engine/decorators/mesh'

@Actor({
  // spawnByReferenceId: 'Warrok'
})
export class Warrok extends ActorInterface<MeshInterface> {
  @Sound({ url: '/assets/sounds/mario-bros tuberia.mp3', spatialEnabled: false, stream: false }) soundTest: SoundConstructor

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
    KJS.Sound.setVolume(0.1)
    this.setInterval(() => {
      Logger.trace('aki SOUND PLAY!')
      KJS.Sound.play(this.soundTest)
    }, 3000)
  }

  onLoopUpdate(delta: number): void {
  }
}
