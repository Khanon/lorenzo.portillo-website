import { Subscription } from 'rxjs';

export class Subscriber {
    private subscriptions: Subscription[] = [];

    protected addSubscription(subscription: Subscription): void {
        this.subscriptions.push(subscription);
    }

    protected releaseSubscriptions(): void {
        // TODO: When should this function be called? After scene switch?
        // Do state.Delete() for all registered states on actors and scene
        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
        this.subscriptions = [];
    }
}
