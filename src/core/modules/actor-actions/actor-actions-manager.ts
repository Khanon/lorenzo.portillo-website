import { Misc } from '../misc/misc';
import { ActorAction } from './actor-action';
import { Logger } from '../logger/logger';

export class ActorActionsManager<T> {
    private registeredActions: Misc.KeyValue<string, ActorAction<T, any>> = new Misc.KeyValue<string, ActorAction<T, any>>();
    private runningActions: Misc.KeyValue<string, ActorAction<T, any>> = new Misc.KeyValue<string, ActorAction<T, any>>();

    registerAction(actorAction: ActorAction<T, any>): void {
        this.registeredActions.add(actorAction.id, actorAction);
    }

    play<P>(actionId: string, properties?: P): void {
        if (!this.isPlaying(actionId)) {
            const actionPair = this.registeredActions.get(actionId);
            if (!actionPair) {
                Logger.warn('Action already running -', actionId);
                return;
            }
            this.runningActions.add(actionPair.key, actionPair.value);
            actionPair.value.setProperties(properties);
            actionPair.value.play();
        }
    }

    stop(actionId: string): void {
        const actionPair = this.registeredActions.get(actionId);
        if (actionPair) {
            this.runningActions.del(actionPair.key);
            actionPair.value.stop();
        }
    }

    isPlaying(actionId: string): boolean {
        return !!this.runningActions.get(actionId);
    }
}
