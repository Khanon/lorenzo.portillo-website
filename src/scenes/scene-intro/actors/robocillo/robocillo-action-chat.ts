import {
  ActorAction,
  ActorActionInterface,
  Helper,
  Logger,
  Sprite,
  SpriteConstructor,
  SpriteInterface
} from '@khanonjs/engine'

import { RobocilloActor } from './robocillo-actor'

@ActorAction()
export class RobocilloActionChat extends ActorActionInterface<any, RobocilloActor> {
  sprite: SpriteInterface
  textId: number = 0

  loadingChats: string[] = [
    'Loading bad ideas...',
    'Developing bugs...',
    'Mixing bits...',
    'Loading bytes...',
    'Generating errors...',
    'Shading shaders...',
    'Wasting energy...'
  ]

  @Sprite({
    width: 100,
    height: 100
  }) chatSprite: SpriteConstructor

  deleteSprite() {
    if (this.sprite) {
      this.sprite.destroy()
      this.sprite = undefined
    }
  }

  onPlay() {
    this.loopUpdate = false
    Helper.Arrays.shuffle(this.loadingChats)
  }

  onStop(): void {
    this.deleteSprite()
  }

  spawnText() {
    this.loopUpdate = true
    this.deleteSprite()
    this.sprite = this.scene.spawn.sprite(this.chatSprite)
    this.sprite.drawText(this.loadingChats[this.textId], {
      fontSize: 30,
      fontStyle: '',
      fontName: 'roadgeek',
      textColor: '#ffffff',
      centerH: true
    })
    this.sprite.transform.position.y += 38
    this.sprite.transform.position.x -= 5
    this.sprite.scale = 0.3
    this.textId++
    if (this.textId > this.loadingChats.length - 1) {
      this.textId = 0
    }
  }

  onLoopUpdate(delta: number): void {
    this.sprite.transform.position.y += 0.1
    this.sprite.transform.color.a -= 0.005
    if (this.sprite.transform.color.a < 0) {
      this.sprite.transform.color.a = 0
    }
  }
}
