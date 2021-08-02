import { State } from './state';
import { Logger } from '../logger/logger';

export class StateMachine<T> {
    currentState: State<T>;
    states: { id: string; state: State<T> }[] = [];

    registerState(state: State<T>): State<T> {
        this.states.push({ id: state.id, state });
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
        const state = this.states.find((state) => state.id === stateId).state;
        if (!state) {
            Logger.error('State not found:', stateId);
        }
        return state;
    }

    getCurrentState(): State<T> {
        return this.currentState;
    }
}
