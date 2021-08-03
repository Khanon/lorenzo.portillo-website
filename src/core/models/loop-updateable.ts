import { Observable, Subscription } from 'rxjs';

export class LoopUpdateable {
    private loopUpdateSubscription: Subscription;

    constructor(protected readonly loopUpdate$?: Observable<number>) {}

    loopUpdate(delta: number): void {}

    subscribeLoopUpdate(): void {
        if (this.loopUpdate$) {
            this.loopUpdateSubscription = this.loopUpdate$.subscribe((delta) => this.loopUpdate(delta));
        }
    }

    unSubscribeLoopUpdate(): void {
        if (this.loopUpdateSubscription) {
            this.loopUpdateSubscription.unsubscribe();
            this.loopUpdateSubscription = undefined;
        }
    }
}
