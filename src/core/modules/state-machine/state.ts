import { Observable, Subscription } from 'rxjs';

export abstract class State<T> {
    abstract id: string;
    loopUpdateSubscription: Subscription;

    constructor(protected readonly parent: T, protected readonly loopUpdate$?: Observable<number>) {}

    abstract start(): void;
    abstract end(): void;

    loopUpdate(delta: number): void {}

    subscribeLoopUpdate(): void {
        if (this.loopUpdate$) {
            this.loopUpdateSubscription = this.loopUpdate$.subscribe((delta) => this.loopUpdate(delta));
        }
    }

    unsubscribeLoopUpdate(): void {
        if (this.loopUpdateSubscription) {
            this.loopUpdateSubscription.unsubscribe();
        }
    }
}
