import * as BABYLON from '@babylonjs/core'
import {
  Actor,
  ActorInterface,
  Helper,
  Logger,
  Sprite,
  SpriteConstructor,
  SpriteInterface
} from '@khanonjs/engine'

import { getRatio } from '../canvas-ratio-consts'

@Actor()
export class SunActor extends ActorInterface<SpriteInterface> {
  paramsRatio0StartPos = new BABYLON.Vector3(1.0, 280, -237)
  paramsRatio1StartPos = new BABYLON.Vector3(1.0, 280, -500)

  paramsRatio0EndPos = new BABYLON.Vector3(1.0, 12, -79)
  paramsRatio1EndPos = new BABYLON.Vector3(1.0, 25, -215)
  paramsRatio0EndScale = 0.6
  paramsRatio1EndScale = 0.9

  targetPosition: BABYLON.Vector3
  targetScale: number = 0

  @Sprite({
    url: './assets/scene-intro/sprites/sun.png'
  }) sun: SpriteConstructor

  onSpawn() {
    const ratio = getRatio()
    this.setBody(this.sun)
    this.transform.position = Helper.Vectors.dragPoint(ratio, this.paramsRatio0StartPos, this.paramsRatio1StartPos)
  }

  onLoopUpdate(delta: number): void {
    const ratio = getRatio()

    this.targetPosition = Helper.Vectors.dragPoint(ratio, this.paramsRatio0EndPos, this.paramsRatio1EndPos)
    this.targetScale = Helper.Maths.dragValue(ratio, this.paramsRatio0EndScale, this.paramsRatio1EndScale)

    const step = Helper.Maths.increaseVectorWithInertia(
      [this.transform.position.y, this.transform.position.z],
      [this.targetPosition.y, this.targetPosition.z],
      0.014 * delta,
      0.8
    )
    this.transform.position.y = step[0]
    this.transform.position.z = step[1]
    const scale = Helper.Maths.increaseValueWithInertia(this.body.scale, this.targetScale, 0.0014 * delta, 1)
    this.body.scale = scale
  }
}
