import * as BABYLON from '@babylonjs/core'
import {
  ActorAction,
  ActorActionInterface,
  Helper,
  Logger,
  Rect,
  Sprite,
  SpriteConstructor
} from '@khanonjs/engine'

import { RobocilloActor } from './robocillo-actor'
import { RobocilloAnimationIds } from './robocillo-animation-ids'

@ActorAction({
  countFrames: 5
})
export class RobocilloActionChat extends ActorActionInterface<{ text: string }, RobocilloActor> {
  @Sprite({
    width: 100,
    height: 100
  }) chatSprite: SpriteConstructor

  onPlay() {
    this.scene.spawn.sprite(this.chatSprite)
  }
}
