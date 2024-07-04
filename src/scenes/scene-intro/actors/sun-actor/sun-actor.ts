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
  scale = 1
  oSize = 0

  paramsRatio0StartPos = new Vector3(0, 280, -237)
  paramsRatio1StartPos = new Vector3(0, 280, -500)

  paramsRatio0EndPos = new Vector3(0, 12, -79)
  paramsRatio1EndPos = new Vector3(0, 25, -215)
  paramsRatio0EndScale = 0.6
  paramsRatio1EndScale = 0.9

  targetPosition: Vector3
  targetScale: number = 0

  onSpawn() {
    const ratio = getRatio()
    this.composer.setBody(SunSprite)
    this.transform.position = Helper.Vectors.dragPoint(ratio, this.paramsRatio0StartPos, this.paramsRatio1StartPos)
    this.oSize = this.composer.body.babylon.spriteManager.cellWidth
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
    this.scale = Helper.Maths.increaseValueWithInertia(this.scale, this.targetScale, 0.0014 * delta, 1)
    this.transform.position.y = step[0]
    this.transform.position.z = step[1]
    this.transform.size = this.oSize * this.scale
  }
}
