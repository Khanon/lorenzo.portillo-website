import * as BABYLON from '@babylonjs/core'
import {
  Actor,
  ActorInterface,
  KJS,
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
  paramsRatio0Pos = new BABYLON.Vector3(0, 136, -2)
  paramsRatio1Pos = new BABYLON.Vector3(0, 115, 240)
  paramsRatio0Scale = 0.35
  paramsRatio1Scale = 0.4

  @Sprite({
    url: './assets/scene-intro/sprites/logo.png',
    cellWidth: 402,
    cellHeight: 83,
    numFrames: 90,
    animations: [
      { id: 'showup', delay: 30, loop: false }
    ]
  }) logo: SpriteConstructor

  onSpawn(): void {
    this.setBody(this.logo)
    setTimeout(() => this.body.playAnimation('showup'), 800)
  }

  onLoopUpdate(delta: number): void {
    const ratio = getRatio()
    if (ratio < VERTICAL_RATIO_CANVAS) {
      this.transform.position = this.paramsRatio0Pos
    } else {
      this.transform.position = KJS.Vectors.dragPoint(ratio, this.paramsRatio0Pos, this.paramsRatio1Pos)
    }
    const scale = KJS.Maths.dragValue(ratio, this.paramsRatio0Scale, this.paramsRatio1Scale)
    this.body.scale = scale
  }
}
