import { EventTrunk } from "./EventTrunk";
import { EventSubscription } from "./EventSubscription";
import { SavedEvent } from "./SavedEvent";

export interface SubscribeToEventsOptions {
	eventName?: string;
	aggregateName?: string;
	aggregateId?: string;
}

export type OnNewEvent = (newEvent: SavedEvent) => void;

export interface EventStore {
	subscribeToEvents(
		options: SubscribeToEventsOptions,
		onNewEvent: OnNewEvent
	): EventSubscription;
	insertUncommittedEvent(event: EventTrunk);
	replayEvents(args?: {});
	commit(): Promise<void>;
}
