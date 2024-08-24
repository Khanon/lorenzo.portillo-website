import * as BABYLON from '@babylonjs/core'
import {
  ActorAction,
  ActorActionInterface,
  Helper,
  KJS,
  Logger,
  Rect,
  Sprite,
  SpriteConstructor,
  SpriteInterface
} from '@khanonjs/engine'

import { RobocilloActor } from './robocillo-actor'
import { RobocilloAnimationIds } from './robocillo-animation-ids'

@ActorAction()
export class RobocilloActionChat extends ActorActionInterface<{ text: string }, RobocilloActor> {
  sprite: SpriteInterface

  @Sprite({
    width: 100,
    height: 100
  }) chatSprite: SpriteConstructor

  deleteSprite() {
    if (this.sprite) {
      this.sprite.destroy()
    }
  }

  onPlay() {
    this.deleteSprite()
    this.sprite = this.scene.spawn.sprite(this.chatSprite)
    this.sprite.drawText('Loading...', {
      fontSize: 30,
      fontStyle: '',
      fontName: 'roadgeek',
      textColor: '#ffffff',
      centerH: true
    })
    this.sprite.transform.position.y += 70
    this.sprite.transform.position.x -= 5
    this.sprite.scale = 0.3
    KJS.setTimeout(() => {
      this.deleteSprite()
    }, 1000)
  }

  onStop(): void {
    this.deleteSprite()
  }
}
