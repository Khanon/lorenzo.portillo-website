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

@ActorAction({
  countFrames: 5
})
export class RobocilloActionGoto extends ActorActionInterface<{ gotoAngle: number }, RobocilloActor> {
  private vDirection: BABYLON.Vector3
  private gotoAngle: number
  private prevDistance: number

  getEarthAngle(): number {
    const vToCenter = this.actor.earth.transform.position.subtract(this.actor.transform.position)
    return Helper.Vectors.angleXBetweenLines(new BABYLON.Vector3(0, -1, 0), vToCenter)
  }

  onSetup(): void {
    this.gotoAngle = this.setup.gotoAngle
    this.prevDistance = Number.MAX_VALUE

    if (this.gotoAngle < this.getEarthAngle()) {
      this.vDirection = BABYLON.Vector3.Cross(this.actor.earth.transform.position.subtract(this.actor.transform.position), new BABYLON.Vector3(1, 0, 0))
        .negate()
        .normalize()
    } else {
      this.vDirection = BABYLON.Vector3.Cross(this.actor.earth.transform.position.subtract(this.actor.transform.position), new BABYLON.Vector3(1, 0, 0)).normalize()
    }
    this.actor.body.playAnimation(RobocilloAnimationIds.WALK)
  }

  onStop(): void {
    Logger.trace('aki ROBOTILLO GOTO STOP')
    // this.subject.physics.scaleVelocity(0.1)
    // this.subject.setAnimation(RobocilloAnimations.STOP_SIDE, false)
    // this.unSubscribeLoopUpdate()
  }

  onLoopUpdate(delta: number): void {
    if (Math.abs(this.getEarthAngle() - this.gotoAngle) > this.prevDistance) {
      this.stop()
    } else {
      // this.subject.physics.applyForce(this.vDirection.scale(0.015))
      this.prevDistance = Math.abs(this.getEarthAngle() - this.gotoAngle)
    }
  }
}
