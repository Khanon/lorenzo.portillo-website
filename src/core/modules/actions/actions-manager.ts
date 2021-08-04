import { Misc } from '../misc/misc';
import { Action } from './action';
import { Logger } from '../logger/logger';

export class ActionsManager<T> {
    private registeredActions: Misc.KeyValue<string, Action<T, any>> = new Misc.KeyValue<string, Action<T, any>>();
    private runningActions: Misc.KeyValue<string, Action<T, any>> = new Misc.KeyValue<string, Action<T, any>>();

    registerAction(action: Action<T, any>): void {
        this.registeredActions.add(action.id, action);
    }

    play<P>(actionId: string, properties?: P): void {
        if (!this.isPlaying(actionId)) {
            const actionPair = this.registeredActions.getByKey(actionId);
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
        const actionPair = this.registeredActions.getByKey(actionId);
        if (actionPair) {
            this.runningActions.del(actionPair.key);
            actionPair.value.stop();
        }
    }

    isPlaying(actionId: string): boolean {
        return !!this.runningActions.get(actionId);
    }
}
