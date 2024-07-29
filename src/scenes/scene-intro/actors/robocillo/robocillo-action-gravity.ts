import * as BABYLON from '@babylonjs/core'
import {
  ActorAction,
  ActorActionInterface,
  ActorInterface,
  Helper,
  SpriteInterface
} from '@khanonjs/engine'

import { Notifications } from '../../../../models/notifications'
import { RobocilloActor } from './robocillo-actor'

@ActorAction()
export class RobocilloActionGravity extends ActorActionInterface<any, RobocilloActor> {
  private readonly GRAVITY_POWER: number = 0.0145 // 0.0345  // 8a8f
  private readonly HORIZONTAL_DECREASE_FACTOR = 0.01
  private readonly RESTITUTION_OVER_FACTOR = 1.5
  private floorLength: number

  onPlay(): void {
    this.floorLength =
      Math.max(
        this.actor.earth.body.babylon.mesh.getBoundingInfo().boundingBox.maximum.x,
        this.actor.earth.body.babylon.mesh.getBoundingInfo().boundingBox.maximum.y,
        this.actor.earth.body.babylon.mesh.getBoundingInfo().boundingBox.maximum.z
      ) + 10.3
  }

  onLoopUpdate(delta: number): void {
    const vToCenter = this.actor.earth.transform.position.subtract(this.actor.physics.getTranslation())
    const hSlowDownVector = Helper.Vectors.vectorialProjectionToPlane(this.actor.physics.getVelocity(), vToCenter).negate()

    // Horizontal slow down factor
    if (hSlowDownVector.length() > Helper.Maths.MIN_VALUE) {
      this.actor.physics.applyForce(hSlowDownVector.scale(this.HORIZONTAL_DECREASE_FACTOR))
    }

    // Check gravity factor
    if (vToCenter.length() > this.floorLength + Helper.Maths.MIN_VALUE) {
      // Apply gravity
      this.actor.physics.onFloor = false
      vToCenter.normalize()
      this.actor.physics.applyForce(vToCenter.scale(this.GRAVITY_POWER))
    } else {
      // Floor contact
      this.actor.physics.onFloor = true
      this.actor.physics.setTranslation(this.actor.earth.transform.position.add(vToCenter.negate().normalize().scale(this.floorLength)))

      // Restitution on floor contact
      const restitutionVector = Helper.Vectors.vectorialProjectionToLine(this.actor.physics.getVelocity(), vToCenter).negate()
      const restitutionVectorLength = restitutionVector.length()
      if (restitutionVectorLength > this.RESTITUTION_OVER_FACTOR) {
        this.actor.physics.applyForce(restitutionVector.scale(1.5))
        this.actor.notify(Notifications.GRAVITY_FLOOR_CONTACT)
      }
    }

    // Rotate the actor according to angle with earth center
    const earthAngle = Helper.Vectors.angleXBetweenLines(new BABYLON.Vector3(0, -1, 0), vToCenter)
    this.actor.physics.setRotationFromFloats(earthAngle, 0, 0)
  }
}
