import {
  ActorAction,
  ActorActionInterface,
  Logger,
  Rect
} from '@khanonjs/engine'

@ActorAction()
export class RobocilloActionGoto extends ActorActionInterface {
  coutner = 0

  onStart(): void {
    Logger.trace('aki RobocilloActionGoto onStart')
  }

  onSetup(): void {
    Logger.trace('aki RobocilloActionGoto onSetup', this.setup)
  }

  onStop(): void {
    Logger.trace('aki RobocilloActionGoto onStop')
  }

  onLoopUpdate(delta: number): void {
    // Logger.trace('aki RobocilloActionGoto onLoopUpdate', this.coutner)
    this.coutner++
  }

  onCanvasResize(size: Rect): void {
    Logger.trace('aki RobocilloActionGoto onCanvasResize')
  }
}
