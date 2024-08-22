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

@ActorAction()
export class RobocilloActionChat extends ActorActionInterface<{ text: string }, RobocilloActor> {
  @Sprite({
    width: 100,
    height: 100
  }) chatSprite: SpriteConstructor

  async onPlay() {
    // const chatSprite1 = this.scene.spawn.sprite(this.chatSprite) // 8a8f hacer esto manualmente, no utilizar particulas
    // chatSprite1.drawText('Loading...', {
    //   fontSize: 30,
    //   fontStyle: '',
    //   fontName: 'roadgeek',
    //   textColor: '#ffffff',
    //   centerH: true
    // })
    // chatSprite1.transform.position.y += 70
    // chatSprite1.transform.position.x -= 5
    // chatSprite1.scale = 0.3
  }
}
