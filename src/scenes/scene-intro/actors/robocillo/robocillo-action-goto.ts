import * as BABYLON from '@babylonjs/core'
import {
  ActorAction,
  ActorActionInterface,
  Helper,
  Logger,
  Rect
} from '@khanonjs/engine'

import { RobocilloActor } from './robocillo-actor'
import { RobocilloAnimationIds } from './robocillo-animation-ids'

@ActorAction()
export class RobocilloActionGoto extends ActorActionInterface<{ gotoAngle: number, onDone: () => void }, RobocilloActor> {
  private vDirection: BABYLON.Vector3
  private gotoAngle: number
  private prevDistance: number

  getEarthAngle(): number {
    Logger.trace('aki getEarthAngle this.actor.earth.transform.position', this.actor.earth.transform.position)
    Logger.trace('aki getEarthAngle this.actor.transform.position', this.actor.transform.position)
    const vToCenter = this.actor.earth.transform.position.subtract(this.actor.transform.position)
    return Helper.Vectors.angleXBetweenLines(new BABYLON.Vector3(0, -1, 0), vToCenter)
  }

  onPlay(): void {
    this.gotoAngle = this.setup.gotoAngle
    this.prevDistance = Number.MAX_VALUE
    Logger.trace('aki GOTO onPlay this.gotoAngle', this.gotoAngle)
    Logger.trace('aki GOTO onPlay this.getEarthAngle()', this.getEarthAngle())
    if (this.gotoAngle < this.getEarthAngle()) {
      this.vDirection = BABYLON.Vector3.Cross(this.actor.earth.transform.position.subtract(this.actor.transform.position), new BABYLON.Vector3(1, 0, 0))
        .negate()
        .normalize()
    } else {
      this.vDirection = BABYLON.Vector3.Cross(this.actor.earth.transform.position.subtract(this.actor.transform.position), new BABYLON.Vector3(1, 0, 0)).normalize()
    }
    Logger.trace('aki GOTO onPlay this.vDirection', this.vDirection)
    this.actor.body.playAnimation(RobocilloAnimationIds.WALK)
  }

  onStop(): void {
    Logger.trace('aki GOTO onStop', this.gotoAngle)
    this.actor.physics.scaleVelocity(0.1)
    this.actor.body.playAnimation(RobocilloAnimationIds.STOP_SIDE, false)
    this.loopUpdate = false
    this.setup.onDone()
  }

  onLoopUpdate(delta: number): void {
    // Logger.trace('aki GOTO onLoopUpdate', this.actor.transform.position)
    // if (Math.abs(this.getEarthAngle() - this.gotoAngle) > this.prevDistance) {
    //   this.stop()
    // } else {
    this.actor.physics.applyForce(this.vDirection.scale(/* 0.015 */0.00015))
    // this.prevDistance = Math.abs(this.getEarthAngle() - this.gotoAngle)
    // }
  }
}
