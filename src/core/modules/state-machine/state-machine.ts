import { State } from '.';
import { Logger } from '../';

export class StateMachine<T> {
    currentState: State<T>;
    states: { id: string; state: State<T> }[] = [];

    registerState(state: State<T>): void {
        this.states.push({ id: state.id, state });
    }

    setState(stateId: string): void {
        if (this.currentState) {
            this.currentState.end();
        }
        const nextState = this.getState(stateId);
        this.currentState = nextState;
        this.currentState.start();
    }

    getState(stateId: string): State<T> {
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
