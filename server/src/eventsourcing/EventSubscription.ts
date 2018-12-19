export interface EventSubscription {
	unsubscribe(): Promise<void>;
}
