import { State } from './state';
import { Logger } from '../logger/logger';
import { Misc } from '../misc/misc';

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
        const pair = this.states.get(stateId);
        if (!pair) {
            Logger.error('State not found:', stateId);
            return undefined;
        }
        return pair.value;
    }

    getCurrentState(): State<T> {
        return this.currentState;
    }
}
