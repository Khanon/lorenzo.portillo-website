import { State } from '.';

export class StateMachine {
    currentState: State;

    GoTo(state: State): void {
        if (this.currentState) {
            this.currentState.Unload();
        }
        this.currentState = state;
        this.currentState.Load();
    }
}
