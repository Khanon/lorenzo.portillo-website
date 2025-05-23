/**
 * Designed for 2D sprites
 */

import * as BABYLON from '@babylonjs/core'
import {
  ActorInterface,
  KJS,
  Logger,
  SpriteInterface
} from '@khanonjs/engine'

export class ActorSimplePhysics {
  private loopUpdate$: BABYLON.Observer<number> | null = null

  private velocity: BABYLON.Vector3 = new BABYLON.Vector3()
  private maxVelocity: number = Number.MAX_VALUE
  private translationMatrix: BABYLON.Matrix = new BABYLON.Matrix()
  private rotation: number = 0

  onFloor: boolean = false

  constructor(private readonly actor: ActorInterface<SpriteInterface>) {
    this.loopUpdate$ = KJS.loopUpdateAddObserver((delta) => this.physicsUpdate(delta))
  }

  release(): void {
    if (this.loopUpdate$) {
      KJS.loopUpdateRemoveObserver(this.loopUpdate$)
      this.loopUpdate$ = null
    }
  }

  setTranslation(translation: BABYLON.Vector3): void {
    this.translationMatrix.setTranslation(translation)
    this.actor.transform.position = this.getTranslation()
  }

  setTranslationFromFloats(x: number, y: number, z: number): void {
    this.translationMatrix.setTranslationFromFloats(x, y, z)
    this.actor.transform.position = this.getTranslation()
  }

  getTranslation(): BABYLON.Vector3 {
    return this.translationMatrix.getTranslation()
  }

  setRotation(rotation: number): void {
    this.rotation = rotation
    this.actor.transform.rotation = this.getRotation()
  }

  getRotation(): number {
    return this.rotation
  }

  applyForce(force: BABYLON.Vector3): void {
    this.velocity = this.velocity.add(force)
    if (this.velocity.length() > this.maxVelocity) {
      this.velocity.normalize().scale(this.maxVelocity)
    }
  }

  applyForceFromFloats(x: number, y: number, z: number): void {
    this.velocity.x += x
    this.velocity.y += y
    this.velocity.z += z
    if (this.velocity.length() > this.maxVelocity) {
      this.velocity.normalize().scale(this.maxVelocity)
    }
  }

  setMaxVelocity(maxVelocity: number): void {
    this.maxVelocity = maxVelocity
  }

  getVelocity(): BABYLON.Vector3 {
    return this.velocity
  }

  scaleVelocity(scale: number): void {
    this.velocity.x *= scale
    this.velocity.y *= scale
    this.velocity.z *= scale
  }

  resetVelocity(): void {
    this.velocity.set(0, 0, 0)
  }

  physicsUpdate(delta: number): void {
    // Set to zero residual vels
    if (Math.abs(this.velocity.x) < KJS.Maths.MIN_VALUE) {
      this.velocity.x = 0
    }
    if (Math.abs(this.velocity.y) < KJS.Maths.MIN_VALUE) {
      this.velocity.y = 0
    }
    if (Math.abs(this.velocity.z) < KJS.Maths.MIN_VALUE) {
      this.velocity.z = 0
    }

    // Apply velocity to position
    this.translationMatrix.addTranslationFromFloats(this.velocity.x * delta, this.velocity.y * delta, this.velocity.z * delta)
    this.actor.transform.position = this.getTranslation()

    // Set rotation
    this.actor.transform.rotation = this.getRotation()
  }
}
