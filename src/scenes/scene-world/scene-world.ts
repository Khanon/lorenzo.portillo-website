import * as BABYLON from '@babylonjs/core'
import {
  Logger,
  Scene,
  SceneInterface,
  Sprite,
  SpriteConstructor
} from '@khanonjs/engine'

import { SceneWorldState } from './scene-world-state'

@Scene({
  states: [
    SceneWorldState
  ]
})
export class SceneWorld extends SceneInterface {
  @Sprite({
    url: '/assets/scene-world/sprites/background.png',
    width: 640,
    height: 1096
  }) background: SpriteConstructor

  @Sprite({
    url: '/assets/scene-world/sprites/background_game.png',
    width: 570,
    height: 367
  }) backgroundGame: SpriteConstructor

  @Sprite({
    url: '/assets/scene-world/sprites/blackie.png',
    width: 359,
    height: 24
  }) blackie: SpriteConstructor

  light1: BABYLON.HemisphericLight
  onLoaded() {
    this.light1 = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 0, 0), this.babylon.scene)
  }

  onStart() {
    const background = this.spawn.sprite(this.background)
    const backgroundGame = this.spawn.sprite(this.backgroundGame)
    const blackie = this.spawn.sprite(this.blackie)

    background.scale = 0.01
    backgroundGame.scale = 0.01
    blackie.scale = 0.01
  }
}
