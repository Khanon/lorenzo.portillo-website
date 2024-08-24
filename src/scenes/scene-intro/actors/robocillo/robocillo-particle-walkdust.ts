import * as BABYLON from '@babylonjs/core'
import {
  Logger,
  Particle,
  ParticleInterface,
  Sprite,
  SpriteConstructor
} from '@khanonjs/engine'

@Particle({
  capacity: 5
})
export class RobocilloParticleWalkDust extends ParticleInterface {
  @Sprite({
    url: './assets/scene-intro/sprites/particle-walk-dust.png',
    width: 34,
    height: 34,
    animations: [
      { id: 0, frameStart: 0, frameEnd: 4 }
    ],
    noMipmap: true,
    samplingMode: BABYLON.Texture.BILINEAR_SAMPLINGMODE
  }) dust: SpriteConstructor

  initialize(particle: ParticleInterface) {
    this.setSprite(this.dust)
    this.setAnimation(0)
    particle.babylon.particleSystem.minSize = 25
    particle.babylon.particleSystem.maxSize = 25
    particle.babylon.particleSystem.updateSpeed = 0.02
    particle.babylon.particleSystem.targetStopDuration = 0.3
  }
}
