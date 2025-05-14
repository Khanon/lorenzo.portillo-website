import * as BABYLON from '@babylonjs/core'
import {
  ActorAction,
  ActorActionInterface,
  KJS,
  Logger
} from '@khanonjs/engine'

import { RobocilloActor } from './robocillo-actor'
import { RobocilloAnimationIds } from './robocillo-animation-ids'

@ActorAction()
export class RobocilloActionGoto extends ActorActionInterface<{ gotoAngle: number, onDone: () => void }, any, RobocilloActor> {
  private vDirection: BABYLON.Vector3
  private gotoAngle: number
  private prevDistance: number

  getEarthAngle(): number {
    const vToCenter = this.actor.earth.t.position.subtract(this.actor.transform.position)
    return KJS.Vectors.angleXBetweenLines(new BABYLON.Vector3(0, -1, 0), vToCenter)
  }

  onPlay(): void {
    this.gotoAngle = this.setup.gotoAngle
    this.prevDistance = Number.MAX_VALUE
    if (this.gotoAngle < this.getEarthAngle()) {
      this.vDirection = BABYLON.Vector3.Cross(this.actor.earth.t.position.subtract(this.actor.transform.position), new BABYLON.Vector3(1, 0, 0))
        .negate()
        .normalize()
    } else {
      this.vDirection = BABYLON.Vector3.Cross(this.actor.earth.t.position.subtract(this.actor.transform.position), new BABYLON.Vector3(1, 0, 0)).normalize()
    }
    this.actor.body.playAnimation(RobocilloAnimationIds.WALK)
  }

  onStop(): void {
    this.actor.physics.scaleVelocity(0.1)
    this.actor.body.playAnimation(RobocilloAnimationIds.STOP_SIDE, { loop: false })
    this.loopUpdate = false
    this.setup.onDone()
  }

  onLoopUpdate(delta: number): void {
    if (Math.abs(this.getEarthAngle() - this.gotoAngle) > this.prevDistance) {
      this.stop()
    } else {
      this.actor.physics.applyForce(this.vDirection.scale(0.008))
      this.prevDistance = Math.abs(this.getEarthAngle() - this.gotoAngle)
    }
  }
}
