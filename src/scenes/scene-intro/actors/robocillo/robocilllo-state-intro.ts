import {
  ActorAction,
  ActorState,
  ActorStateInterface,
  Logger,
  Rect
} from '@khanonjs/engine'

import { RobocilloActionGoto } from './robocillo-action-goto'
import { RobocilloActor } from './robocillo-actor'

@ActorState()
export class RobocilloStateIntro extends ActorStateInterface<any, RobocilloActor> {
  @ActorAction()
  moveUp(delta: number) {
    Logger.trace('aki STATE moveUp', this)
    this.actor.stopAction(this.moveUp)
  }

  @ActorAction()
  moveDown(delta: number) {
    Logger.trace('aki STATE moveDown', this)
    this.actor.stopAction(this.moveDown)
  }

  onStart(): void {
    Logger.trace('aki RobocilloStateIntro, onStart')
    this.actor.playAction(RobocilloActionGoto)
    this.actor.playAction(this.moveUp)
    this.actor.playAction(this.moveDown)
  }
}
