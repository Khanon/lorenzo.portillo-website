import {
  ActorAction,
  ActorState,
  ActorStateInterface,
  Logger,
  Rect
} from '@khanonjs/engine'

@ActorState()
export class RobocilloStateIntro extends ActorStateInterface {
  @ActorAction()
  moveUp(delta: number) {
    Logger.trace('aki STATE moveUp', this.moveUp)
    this.actor.stopAction(this.moveUp)
  }

  @ActorAction()
  moveDown(delta: number) {
    Logger.trace('aki STATE moveDown', delta)
  }

  onStart(): void {
    Logger.trace('aki RobocilloStateIntro, onStart')
    this.actor.playAction(this.moveUp)
    // setTimeout(() => {
    //   this.actor.stopAction(this.moveUp)
    // }, 2000)
  }
}
