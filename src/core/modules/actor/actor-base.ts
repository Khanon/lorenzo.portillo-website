import { StateMachine } from '../';
import { DisplayObject } from '../../models/display-object';

export abstract class ActorBase {
    protected stateMachine: StateMachine = new StateMachine();
    protected displayObject: DisplayObject;
}
