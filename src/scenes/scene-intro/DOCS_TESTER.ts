/*
import {
  Actor,
  ActorInterface,
  KJS,
  Notification,
  SceneState,
  SceneStateInterface,
  SpriteInterface
} from '@khanonjs/engine'

@Actor()
export class SomeActor extends ActorInterface<SpriteInterface> {
  @Notification({
    message: 'some-message'
  })
  someMessageReceived() {
    // 'some-message' received
  }
}

@SceneState()
export class SomeSceneState extends SceneStateInterface{
  @Notification({
    message: 'some-message'
  })
  someMessageReceived() {
    // 'some-message' received
  }
}

example() {
  KJS.Notify.send('some-message', [SomeActor, SomeSceneState])
}
*/
