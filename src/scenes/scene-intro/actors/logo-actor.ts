import { Vector3 } from '@babylonjs/core/Maths/math.vector'
import {
  Actor,
  ActorInterface,
  Helper,
  Logger,
  Sprite,
  SpriteConstructor,
  SpriteInterface
} from '@khanonjs/engine'

import {
  getRatio,
  VERTICAL_RATIO_CANVAS
} from '../canvas-ratio-consts'

@Actor()
export class LogoActor extends ActorInterface<SpriteInterface> {
  paramsRatio0Pos = new Vector3(0, 136, -2)
  paramsRatio1Pos = new Vector3(0, 115, 240)
  paramsRatio0Scale = 0.35
  paramsRatio1Scale = 0.4

  @Sprite({
    url: './assets/scene-intro/sprites/logo.png',
    cellWidth: 402,
    cellHeight: 83,
    numFrames: 90
  }) logo: SpriteConstructor

  onSpawn(): void {
    this.setBody(this.logo)
    setTimeout(() => this.body.playAnimation({ id: 'showup', delay: 30, loop: false }), 800)
  }

  onLoopUpdate(delta: number): void {
    const ratio = getRatio()
    if (ratio < VERTICAL_RATIO_CANVAS) {
      this.transform.position = this.paramsRatio0Pos
    } else {
      this.transform.position = Helper.Vectors.dragPoint(ratio, this.paramsRatio0Pos, this.paramsRatio1Pos)
    }
    this.body.scale = Helper.Maths.dragValue(ratio, this.paramsRatio0Scale, this.paramsRatio1Scale)
  }
}
