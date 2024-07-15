import {
  Actor,
  ActorInterface,
  Logger,
  Sprite,
  SpriteConstructor,
  SpriteInterface
} from '@khanonjs/engine'

import { RobocilloAnimationIds } from './robocillo-animation-ids'
import { RobocilloKeyFrames } from './robocillo-keyframes'

@Actor()
export class RobocilloActor extends ActorInterface<SpriteInterface> {
  @Sprite({
    url: './assets/scene-intro/sprites/robocillo.png',
    animations: [
      { id: RobocilloAnimationIds.STOP_SIDE, delay: 75, frameStart: 0, frameEnd: 0, loop: false },
      { id: RobocilloAnimationIds.PAPER_TAKE, delay: 75, frameStart: 8, frameEnd: 15, loop: false },
      { id: RobocilloAnimationIds.PAPER_CHECK, delay: 75, frameStart: 16, frameEnd: 21, loop: false },
      { id: RobocilloAnimationIds.PAPER_THROW, delay: 75, frameStart: 24, frameEnd: 27, loop: false },
      { id: RobocilloAnimationIds.SIDE_TO_FRONT, delay: 75, frameStart: 32, frameEnd: 34, loop: false },
      { id: RobocilloAnimationIds.FRONT_TO_SIDE, delay: 75, frameStart: 40, frameEnd: 42, loop: false },
      { id: RobocilloAnimationIds.STOP_FRONT, delay: 75, frameStart: 48, frameEnd: 48, loop: false },
      {
        id: RobocilloAnimationIds.WALK,
        delay: 75,
        frameStart: 56,
        frameEnd: 63,
        loop: true,
        keyFrames: [
          {
            id: RobocilloKeyFrames.FLOOR_CONTACT,
            frames: [56, 60]
          }
        ]
      },
      { id: RobocilloAnimationIds.MOVE_HANDS, delay: 75, frameStart: 64, frameEnd: 66, loop: true },
      { id: RobocilloAnimationIds.RAISE_HANDS, delay: 75, frameStart: 72, frameEnd: 74, loop: true },
      { id: RobocilloAnimationIds.JUMP_FRONT, delay: 75, frameStart: 80, frameEnd: 85, loop: false }
    ]
  }) roboti: SpriteConstructor

  onSpawn(): void {
    // Logger.trace('aki ActorRobocillo onSpawn')
    // this.setBody(this.roboti)
  }
}
