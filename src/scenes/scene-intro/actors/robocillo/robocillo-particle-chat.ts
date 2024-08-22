import * as BABYLON from '@babylonjs/core'
import {
  Logger,
  Particle,
  ParticleInterface,
  Sprite,
  SpriteConstructor
} from '@khanonjs/engine'
import { SpritesController } from '@khanonjs/engine/controllers'

import { RobocilloAnimationIds } from './robocillo-animation-ids'
import { RobocilloKeyFrames } from './robocillo-keyframes'

@Particle(/* {
  sprites?: SpriteConstructor[]
  offset?: BABYLON.Vector3 | BABYLON.Matrix
  capacity?: number
} */)
export class RobocilloParticleChat extends ParticleInterface {
  @Sprite({
    url: './assets/scene-intro/sprites/test.png',
    width: 200,
    height: 100
  }) test1: SpriteConstructor

  @Sprite({
    url: './assets/scene-intro/sprites/robocillo.png',
    width: 34,
    height: 34,
    animations: [
      { id: RobocilloAnimationIds.STOP_SIDE, delay: 75, frameStart: 0, frameEnd: 0, loop: false },
      { id: RobocilloAnimationIds.PAPER_TAKE, delay: 75, frameStart: 8, frameEnd: 15, loop: false },
      { id: RobocilloAnimationIds.PAPER_CHECK, delay: 75, frameStart: 16, frameEnd: 21, loop: false },
      { id: RobocilloAnimationIds.PAPER_THROW, delay: 75, frameStart: 24, frameEnd: 27, loop: false },
      { id: RobocilloAnimationIds.SIDE_TO_FRONT, delay: 75, frameStart: 32, frameEnd: 34, loop: false },
      { id: RobocilloAnimationIds.FRONT_TO_SIDE, delay: 75, frameStart: 40, frameEnd: 42, loop: false },
      { id: RobocilloAnimationIds.STOP_FRONT, delay: 75, frameStart: 48, frameEnd: 48, loop: false },
      {
        id: RobocilloAnimationIds.WALK,
        delay: 75,
        frameStart: 56,
        frameEnd: 63,
        loop: true,
        keyFrames: [
          {
            id: RobocilloKeyFrames.FLOOR_CONTACT,
            frames: [56, 60]
          }
        ]
      },
      { id: RobocilloAnimationIds.MOVE_HANDS, delay: 75, frameStart: 64, frameEnd: 66, loop: true },
      { id: RobocilloAnimationIds.RAISE_HANDS, delay: 75, frameStart: 72, frameEnd: 74, loop: true },
      { id: RobocilloAnimationIds.JUMP_FRONT, delay: 75, frameStart: 80, frameEnd: 85, loop: false }
    ],
    noMipmap: true,
    samplingMode: BABYLON.Texture.BILINEAR_SAMPLINGMODE
  }) roboti: SpriteConstructor

  initialize(particleSystem: BABYLON.ParticleSystem) {
    Logger.trace('aki scene', this.scene)
    const sprite = SpritesController.get(this.test1).spawn(this.scene)
    sprite.transform.position.x = 1000
    sprite.transform.position.y = 1000
    this.setSprite(this.test1)
    particleSystem.particleTexture = sprite.babylon.spriteManager.texture
    particleSystem.emitter = new BABYLON.Vector3(-19.742, 105.251, 3.932)
    particleSystem.minScaleX = 2
    particleSystem.maxScaleX = 2
    particleSystem.minScaleY = 1
    particleSystem.maxScaleY = 1
    particleSystem.minSize = 100
    particleSystem.maxSize = 100
    particleSystem.emitRate = 1
  }
}
