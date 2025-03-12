import * as BABYLON from '@babylonjs/core'
import {
  ActorState,
  ActorStateInterface,
  Helper,
  KJS,
  Logger
} from '@khanonjs/engine'

import { getRatio } from '../../canvas-ratio-consts'
import { RobocilloActionChat } from './robocillo-action-chat'
import { RobocilloActionGoto } from './robocillo-action-goto'
import { RobocilloActionGravity } from './robocillo-action-gravity'
import { RobocilloActor } from './robocillo-actor'
import { RobocilloAnimationIds } from './robocillo-animation-ids'
import { HappyState } from './robocillo-happy-state'

@ActorState()
export class RobocilloStateIntro extends ActorStateInterface<any, any, RobocilloActor> {
  readonly paramsRatio0Pos = new BABYLON.Vector3(-20, 7, -140)
  readonly paramsRatio1Pos = new BABYLON.Vector3(-20, -48, -440)
  readonly paramRatio0AngleSun = -0.055
  readonly paramRatio1AngleSun = -0.183
  private readonly ANGLE_CENTER = -0.004
  ANGLE_SUN = 0

  private loading: boolean
  private loadingSteps: number
  private timeout: KJS.Timeout | undefined
  private actionChat: RobocilloActionChat

  onStart(): void {
    const ratio = getRatio()
    this.actor.enabled = true
    this.actor.visibility = 1
    this.actor.playAction(RobocilloActionGravity, {})
    this.actor.physics.setTranslation(Helper.Vectors.dragPoint(ratio, this.paramsRatio0Pos, this.paramsRatio1Pos))
    this.ANGLE_SUN = Helper.Maths.dragValue(ratio, this.paramRatio0AngleSun, this.paramRatio1AngleSun)
    this.loading = true
    this.loadingSteps = 0
    this.goIn()
  }

  onEnd(): void {
    if (this.timeout) {
      this.clearTimeout(this.timeout)
      this.timeout = undefined
    }
  }

  goIn(): void {
    this.actor.playAction(RobocilloActionGoto, {
      gotoAngle: this.ANGLE_SUN,
      onDone: () => {
        this.timeout = this.setTimeout(() => {
          this.stopSun()
        }, 500, this)
      }
    })
  }

  stopSun(): void {
    this.actor.body.playAnimation(RobocilloAnimationIds.SIDE_TO_FRONT, { loop: false })
    this.setTimeout(() => this.actor.body.playAnimation(RobocilloAnimationIds.MOVE_HANDS, { loop: true }), 500, this)
    this.setTimeout(() => this.actor.body.playAnimation(RobocilloAnimationIds.STOP_FRONT, { loop: false }), 1000, this)
    this.setTimeout(() => this.goCenter(), 1500, this)
  }

  goCenter(): void {
    this.actor.playAction(RobocilloActionGoto, {
      gotoAngle: this.ANGLE_CENTER,
      onDone: () => {
        this.timeout = this.setTimeout(() => this.stopCenter(), 100, this)
      }
    })
  }

  stopCenter(): void {
    this.actor.body.playAnimation(RobocilloAnimationIds.SIDE_TO_FRONT, { loop: false })
    this.setTimeout(() => this.actor.body.playAnimation(RobocilloAnimationIds.PAPER_TAKE, { loop: false }), 500, this)
    this.setTimeout(() => {
      this.actionChat = this.actor.playAction(RobocilloActionChat, {})
      this.checkPaper()
    }, 500, this)
  }

  checkPaper(): void {
    if (this.loading || this.loadingSteps < 3) {
      this.setTimeout(
        () =>
          this.actor.body.playAnimation(RobocilloAnimationIds.PAPER_CHECK, { loop: false }, () => {
            this.actionChat.spawnChat()
            this.checkPaper()
          }),
        700 + Math.random() * 800,
        this
      )
      this.loadingSteps++
      if (this.loadingSteps > 5) { // 8a8f eliminar
        this.loading = false
      }
    } else {
      this.actor.body.playAnimation(RobocilloAnimationIds.PAPER_THROW, { loop: false }, () => {
        this.centerEnd(HappyState.JUMP)
        this.actionChat.spawnChatEnd()
      })
    }
  }

  centerEnd(happiness?: HappyState): void {
    switch (happiness ?? Helper.Maths.randomInt(HappyState.MOVE_HANDS, HappyState.JUMP)) {
    case HappyState.MOVE_HANDS:
      this.actor.body.playAnimation(RobocilloAnimationIds.MOVE_HANDS)
      this.setTimeout(() => this.centerEnd(), 500 + Math.random() * 1000, this)
      break
    case HappyState.RAISE_HANDS:
      this.actor.body.playAnimation(RobocilloAnimationIds.RAISE_HANDS)
      this.setTimeout(() => this.centerEnd(), 500 + Math.random() * 1000, this)
      break
    case HappyState.JUMP:
      if (this.actor.physics.onFloor) {
        const vJump = this.actor.earth.t.position.subtract(this.actor.transform.position).negate().normalize().scale(0.9)
        this.actor.body.playAnimation(RobocilloAnimationIds.JUMP_FRONT, { loop: false })
        this.actor.physics.resetVelocity()
        this.setTimeout(() => this.actor.physics.applyForce(vJump), 200, this)
      }
      this.setTimeout(() => this.centerEnd(), 1200, this)
      break
    }
  }
}
