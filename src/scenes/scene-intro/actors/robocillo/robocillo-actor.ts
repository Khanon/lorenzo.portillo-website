import * as BABYLON from '@babylonjs/core'
import {
  Actor,
  ActorAction,
  ActorInterface,
  Helper,
  InputEvent,
  InputEventArgData,
  InputEventIds,
  KJS,
  Logger,
  Notification,
  Particle,
  ParticleInterface,
  Sprite,
  SpriteConstructor,
  SpriteInterface
} from '@khanonjs/engine'

import { Notifications } from '../../../../models/notifications'
import { ActorSimplePhysics } from '../../../../physics/actor-simple-physics'
import { EarthActor } from '../earth/earth-actor'
import { RobocilloStateIntro } from './robocilllo-state-intro'
import { RobocilloActionChat } from './robocillo-action-chat'
import { RobocilloActionGoto } from './robocillo-action-goto'
import { RobocilloActionGravity } from './robocillo-action-gravity'
import { RobocilloAnimationIds } from './robocillo-animation-ids'
import { RobocilloKeyFrames } from './robocillo-keyframes'

@Actor({
  states: [
    RobocilloStateIntro
  ],
  actions: [
    RobocilloActionGoto,
    RobocilloActionChat,
    RobocilloActionGravity
  ],
  renderingGroupId: 1,
  enabled: false
})
export class RobocilloActor extends ActorInterface<SpriteInterface> {
  earth: EarthActor
  physics: ActorSimplePhysics
  particleDust = 'particle-dust'

  @Sprite({
    url: './assets/scene-intro/sprites/particle-walk-dust.png',
    cellWidth: 34,
    cellHeight: 34,
    animations: [
      { id: 0, frameStart: 0, frameEnd: 4 }
    ],
    noMipmap: true,
    samplingMode: BABYLON.Texture.BILINEAR_SAMPLINGMODE
  }) dust: SpriteConstructor

  @Particle({
    renderOverScene: true
  })
  walkDust(particle: ParticleInterface) {
    particle.setSprite(this.dust)
    particle.setAnimation(0)
    particle.babylon.particleSystem.minSize = 25
    particle.babylon.particleSystem.maxSize = 25
    particle.babylon.particleSystem.updateSpeed = 0.02
    particle.babylon.particleSystem.targetStopDuration = 0.1
  }

  @Sprite({
    url: './assets/scene-intro/sprites/hat.png'
  }) hat: SpriteConstructor

  @Sprite({
    url: './assets/scene-intro/sprites/robocillo.png',
    cellWidth: 34,
    cellHeight: 34,
    animations: [
      { id: RobocilloAnimationIds.STOP_SIDE, delay: 90, frameStart: 0, frameEnd: 0, loop: false },
      { id: RobocilloAnimationIds.PAPER_TAKE, delay: 90, frameStart: 8, frameEnd: 15, loop: false },
      { id: RobocilloAnimationIds.PAPER_CHECK, delay: 90, frameStart: 16, frameEnd: 21, loop: false },
      { id: RobocilloAnimationIds.PAPER_THROW, delay: 90, frameStart: 24, frameEnd: 27, loop: false },
      { id: RobocilloAnimationIds.SIDE_TO_FRONT, delay: 90, frameStart: 32, frameEnd: 34, loop: false },
      { id: RobocilloAnimationIds.FRONT_TO_SIDE, delay: 90, frameStart: 40, frameEnd: 42, loop: false },
      { id: RobocilloAnimationIds.STOP_FRONT, delay: 90, frameStart: 48, frameEnd: 48, loop: false },
      {
        id: RobocilloAnimationIds.WALK,
        delay: 90,
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
      { id: RobocilloAnimationIds.MOVE_HANDS, delay: 90, frameStart: 64, frameEnd: 66, loop: true },
      { id: RobocilloAnimationIds.RAISE_HANDS, delay: 90, frameStart: 72, frameEnd: 74, loop: true },
      { id: RobocilloAnimationIds.JUMP_FRONT, delay: 90, frameStart: 80, frameEnd: 85, loop: false }
    ],
    noMipmap: true,
    samplingMode: BABYLON.Texture.BILINEAR_SAMPLINGMODE
  }) roboti: SpriteConstructor

  @Notification({
    id: Notifications.GRAVITY_FLOOR_CONTACT
  }) floorContact() {
    this.startParticle(this.particleDust)
  }

  onSpawn(): void {
    this.setBody(this.roboti)
    // this.addNode(this.hat, 'hat', { position: new BABYLON.Vector3(0, 7, -1) })
    this.physics = new ActorSimplePhysics(this)
    this.body.scale = 0.78
    this.attachParticle(this.particleDust, this.walkDust, {}, new BABYLON.Vector3(0, 0, 0))
    this.body.subscribeToKeyframe(RobocilloKeyFrames.FLOOR_CONTACT, () => this.floorContact())

    this.attachParticle(this.particleDust, this.walkDust, {}, new BABYLON.Vector3(0, 0, 0)) // 8a8f eliminar
    this.attachParticle(this.particleDust, this.walkDust, {}, new BABYLON.Vector3(0, 0, 0)) // 8a8f eliminar
    this.attachParticle(this.particleDust, this.walkDust, {}, new BABYLON.Vector3(0, 0, 0)) // 8a8f eliminar
  }

  onDestroy(): void {
    this.physics?.release()
  }
}
