import { Vector3 } from '@babylonjs/core/Maths/math.vector'
import {
  Actor,
  ActorInterface,
  Helper,
  Logger,
  SpriteInterface
} from '@khanonjs/engine'

import { getRatio } from '../../canvas-ratio-consts'
import { SunSprite } from './sun-sprite'

@Actor({
  sprites: [SunSprite]
})
export class SunActor extends ActorInterface<SpriteInterface> {
  paramsRatio0StartPos = new Vector3(0, 280, -237)
  paramsRatio1StartPos = new Vector3(0, 280, -500)
  paramsRatio0StartScale = 0.35
  paramsRatio1StartScale = 0.4

  paramsRatio0EndPos = new Vector3(0, 12, -79)
  paramsRatio1EndPos = new Vector3(0, 25, -215)
  paramsRatio0EndScale = 0.6
  paramsRatio1EndScale = 0.9

  targetPosition: Vector3
  targetScale: number = 0

  onSpawn() {
    const ratio = getRatio()
    const sun = this.composer.setBody(SunSprite)
    sun.setFrame(0)
    this.transform.position = Helper.Vectors.dragPoint(ratio, this.paramsRatio0StartPos, this.paramsRatio1StartPos)
    Logger.trace('aki START POSITION', ratio, this.paramsRatio0StartPos, this.paramsRatio1StartPos, this.transform.position)
    // this.transform.scale = 1
  }

  onLoopUpdate(delta: number): void {
    const ratio = getRatio()

    this.targetPosition = Helper.Vectors.dragPoint(ratio, this.paramsRatio0EndPos, this.paramsRatio1EndPos)
    this.targetScale = Helper.Maths.dragValue(ratio, this.paramsRatio0EndScale, this.paramsRatio1EndScale)

    const step = Helper.Maths.increaseVectorWithInertia(
      [this.transform.position.y, this.transform.position.z],
      [this.targetPosition.y, this.targetPosition.z],
      0.05 * delta,
      1
    )
    // const scale = Helper.Maths.increaseValueWithInertia(this.transform.scale, this.targetScale, 0.005 * delta, 1)
    this.transform.position.y = step[0]
    this.transform.position.z = step[1]
    // this.transform.scale = scale
    // Logger.trace('aki TRANSFORM', step[0], step[1])
    // Logger.trace('aki POSITION', this.composer.body.babylon.sprite.position)
  }
}
