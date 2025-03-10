import * as BABYLON from '@babylonjs/core'
import {
  ActorAction,
  ActorActionInterface,
  Helper,
  Logger,
  SceneInterface,
  Sprite,
  SpriteConstructor,
  SpriteInterface
} from '@khanonjs/engine'

import { RobocilloActor } from './robocillo-actor'

@ActorAction()
export class RobocilloActionChat extends ActorActionInterface<any, SceneInterface, RobocilloActor> {
  spriteChat: SpriteInterface | undefined
  spriteChatEnd1: SpriteInterface | undefined
  spriteChatEnd2: SpriteInterface | undefined

  posSin = new BABYLON.Vector3(0, 5, 0)
  rotSin = new BABYLON.Vector3(0.05, 0, 0)
  spriteChatEnd1_RotSinTime: number = 0
  spriteChatEnd1_PosSinTime: number = 0
  spriteChatEnd1_Position: BABYLON.Vector3

  spriteChatEnd2_RotSinTime: number = 0
  spriteChatEnd2_PosSinTime: number = 1
  spriteChatEnd2_Position: BABYLON.Vector3

  textId: number = 0
  loadingChats: string[] = [
    'Loading bad ideas...',
    'Developing bugs...',
    'Mixing bits...',
    'Moving bytes to restricted areas...',
    'Generating errors...',
    'Shading shaders...',
    'Wasting energy...'
  ]

  @Sprite({
    width: 1,
    height: 1
  }) chatSprite: SpriteConstructor

  deleteSprite() {
    if (this.spriteChat) {
      this.spriteChat.destroy()
      this.spriteChat = undefined
    }
  }

  deleteSpriteEnd() {
    if (this.spriteChatEnd1) {
      this.spriteChatEnd1.destroy()
      this.spriteChatEnd1 = undefined
    }
    if (this.spriteChatEnd2) {
      this.spriteChatEnd2.destroy()
      this.spriteChatEnd2 = undefined
    }
  }

  onPlay() {
    this.loopUpdate = false
    Helper.Arrays.shuffle(this.loadingChats)
  }

  onRemove(): void {
    this.deleteSprite()
    this.deleteSpriteEnd()
  }

  spawnChat() {
    this.loopUpdate = true
    this.deleteSprite()
    this.spriteChat = this.scene.spawn.sprite(this.chatSprite)
    this.spriteChat.drawText(this.loadingChats[this.textId], {
      fontSize: 30,
      fontStyle: '',
      fontName: 'roadgeek',
      textColor: '#ffffff',
      centerH: true
    })
    this.spriteChat.position.y += 38
    this.spriteChat.position.x -= 5
    this.spriteChat.scale = 0.3
    this.textId++
    if (this.textId > this.loadingChats.length - 1) {
      this.textId = 0
    }
  }

  spawnChatEnd() {
    this.spriteChatEnd1 = this.scene.spawn.sprite(this.chatSprite)
    this.spriteChatEnd1.drawText('READY!', {
      fontSize: 30,
      fontStyle: '',
      fontName: 'roadgeek',
      textColor: '#ffffff',
      centerH: true
    })
    this.spriteChatEnd1_Position = new BABYLON.Vector3(-30, 75, 0)
    this.spriteChatEnd1.scale = 0.4

    this.spriteChatEnd2 = this.scene.spawn.sprite(this.chatSprite)
    this.spriteChatEnd2.drawText('This web will be available soon', {
      fontSize: 30,
      fontStyle: '',
      fontName: 'roadgeek',
      textColor: '#ffffff',
      centerH: true
    })
    this.spriteChatEnd2_Position = new BABYLON.Vector3(-30, 60, 0)
    this.spriteChatEnd2.scale = 0.3
  }

  onLoopUpdate(delta: number): void {
    if (this.spriteChat) {
      this.spriteChat.position.y += 0.1
      this.spriteChat.visibility -= 0.005
      if (this.spriteChat.visibility <= 0) {
        this.deleteSprite()
      }
    }
    if (this.spriteChatEnd1 && this.spriteChatEnd2) {
      this.spriteChatEnd1_RotSinTime += delta * 0.04
      this.spriteChatEnd1.rotation = this.rotSin.scale(Math.sin(this.spriteChatEnd1_RotSinTime)).x

      this.spriteChatEnd1_PosSinTime += delta * 0.03
      this.spriteChatEnd1.position = this.spriteChatEnd1_Position.add(this.posSin.scale(Math.sin(this.spriteChatEnd1_PosSinTime)))

      this.spriteChatEnd2_RotSinTime += delta * 0.03
      this.spriteChatEnd2.rotation = this.rotSin.scale(Math.sin(this.spriteChatEnd2_RotSinTime)).x

      this.spriteChatEnd2_PosSinTime += delta * 0.03
      this.spriteChatEnd2.position = this.spriteChatEnd2_Position.add(this.posSin.scale(Math.sin(this.spriteChatEnd2_PosSinTime)))
    }
  }
}
