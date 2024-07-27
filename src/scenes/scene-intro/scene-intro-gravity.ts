import * as BABYLON from '@babylonjs/core'
import {
  ActorInterface,
  Helper,
  SceneAction,
  SceneActionInterface,
  SpriteInterface
} from '@khanonjs/engine'

@SceneAction()
export class SceneIntroGravity extends SceneActionInterface<{ earth: ActorInterface<SpriteInterface> }> {
  private readonly GRAVITY_POWER: number = 0.0345
  private readonly HORIZONTAL_DECREASE_FACTOR = 0.01
  private readonly RESTITUTION_OVER_FACTOR = 1.5
  private floorLength: number

  private readonly actors: ActorInterface<SpriteInterface>[] = []

  onPlay(): void {
    this.floorLength =
      Math.max(
        this.setup.earth.body.babylon.sprite.getBoundingInfo().boundingBox.maximum.x,
        this.setup.earth.body.babylon.sprite.getBoundingInfo().boundingBox.maximum.y,
        this.setup.earth.body.babylon.sprite.getBoundingInfo().boundingBox.maximum.z
      ) + 10.3
  }

  addActor(actor: ActorInterface<SpriteInterface>) {
    this.actors.push(actor)
  }

  onLoopUpdate(delta: number): void {
    /* this.actors.forEach((actor) => {
      const vToCenter = this.setup.earth.transform.position.subtract(actor.physics.getTranslation())
      const hSlowDownVector = Helper.Vectors.vectorialProjectionToPlane(actor.physics.getVelocity(), vToCenter).negate()

      // Horizontal slow down factor
      if (hSlowDownVector.length() > Helper.Maths.MIN_VALUE) {
        actor.physics.applyForce(hSlowDownVector.scale(this.HORIZONTAL_DECREASE_FACTOR))
      }

      // Check gravity factor
      if (vToCenter.length() > this.floorLength + Helper.Maths.MIN_VALUE) {
        // Apply gravity
        actor.physics.onFloor = false
        vToCenter.normalize()
        actor.physics.applyForce(vToCenter.scale(this.GRAVITY_POWER))
      } else {
        // Floor contact
        actor.physics.onFloor = true
        actor.physics.setTranslation(SceneIntroGlobals.earth.getPosition().add(vToCenter.negate().normalize().scale(this.floorLength)))

        // Restitution on floor contact
        const restitutionVector = Helper.Vectors.vectorialProjectionToLine(actor.physics.getVelocity(), vToCenter).negate()
        const restitutionVectorLength = restitutionVector.length()
        if (restitutionVectorLength > this.RESTITUTION_OVER_FACTOR) {
          actor.physics.applyForce(restitutionVector.scale(1.5))
          actor.notify(SceneIntroMessages.GRAVITY_FLOOR_CONTACT)
        }
      }

      // Rotate the actor according to angle with earth center
      const earthAngle = Helper.Vectors.angleXBetweenLines(new BABYLON.Vector3(0, -1, 0), vToCenter)
      actor.physics.setRotationFromFloats(earthAngle, 0, 0)
    }) */
  }
}
