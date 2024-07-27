import * as BABYLON from '@babylonjs/core'
import {
  ActorAction,
  ActorActionInterface,
  Helper,
  Logger,
  Rect
} from '@khanonjs/engine'

import { RobocilloActor } from './robocillo-actor'
import { RobocilloAnimationIds } from './robocillo-animation-ids'

@ActorAction({
  countFrames: 5
})
export class RobocilloActionChat extends ActorActionInterface<any, RobocilloActor> {
}
