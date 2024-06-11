import {
  Actor2D,
  Actor2DInterface,
  Logger
} from '@khanonjs/engine'

@Actor2D({
})
export class ActorEarth extends Actor2DInterface {
  onLoaded(): void {
    Logger.trace('aki ActorEarth onLoaded')
  }
}
