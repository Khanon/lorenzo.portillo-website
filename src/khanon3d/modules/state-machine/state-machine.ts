import { State } from './state';
import { Logger } from '../logger/logger';
import * as Misc from '../../misc';

export class StateMachine<T> {
    currentState: State<T>;
    states: Misc.KeyValue<string, State<T>> = new Misc.KeyValue<string, State<T>>();

    registerState(state: State<T>): State<T> {
        this.states.add(state.id, state);
        return state;
    }

    set(stateId: string): void {
        if (this.currentState) {
            this.currentState.end();
        }
        const nextState = this.get(stateId);
        this.currentState = nextState;
        this.currentState.start();
    }

    get(stateId: string): State<T> {
        const state = this.states.get(stateId);
        if (!state) {
            Logger.error('State not found:', stateId);
            return undefined;
        }
        return state;
    }

    getCurrentState(): State<T> {
        return this.currentState;
    }

    notify(id: any): void {
        if (this.currentState) {
            this.currentState.notify(id);
        }
    }

    notifyAll(id: any): void {
        this.states.getValues().forEach((state) => {
            state.notify(id);
        });
    }
}
