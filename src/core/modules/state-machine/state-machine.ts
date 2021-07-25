import { State } from '.';
import { Logger } from '../';

export class StateMachine {
    currentState: State;
    states: { id: string; state: State }[];

    registerState(state: State): void {
        this.states.push({ id: state.id, state });
    }

    getState(stateId: string): State {
        const state = this.states.find((state) => state.id === stateId).state;
        if (!state) {
            Logger.error('State not found:', stateId);
        }
        return state;
    }

    goTo(stateId: string): void {
        if (this.currentState) {
            this.currentState.End();
        }
        const nextState = this.getState(stateId);
        this.currentState = nextState;
        this.currentState.Start();
    }
}
