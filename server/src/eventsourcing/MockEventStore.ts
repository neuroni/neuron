import { SavedEvent } from "./SavedEvent";
import { EventStore, SubscribeToEventsOptions, OnNewEvent } from "./EventStore";
import { EventTrunk } from "./EventTrunk";
import { EventStorage } from "./EventStorage";

export type AggregateRow = {
	columnName: string;
	aggregateId: string;
	type: string;
	version: number;
};

interface Subscriber {
	subscriberIndex: number;
	aggregateId?: string;
	aggregateName?: string;
	eventName?: string;
	onNewEvent: OnNewEvent;
}

export class MockEventStore implements EventStore {
	private uncommittedEvents: SavedEvent[] = [];

	private subscribers: Subscriber[];

	private nextSubscriberIndex: number;

	private currentVersions = new Map<string, number>();

	private eventStorage: EventStorage;

	constructor(args: { eventStorage: EventStorage }) {
		this.subscribers = [];
		this.eventStorage = args.eventStorage;
	}

	private getNextVersion(aggregateId: string) {
		let currentVersion = this.currentVersions.get(aggregateId);
		if (!currentVersion) {
			currentVersion = 0;
		}
		currentVersion++;
		this.currentVersions.set(aggregateId, currentVersion);
		return currentVersion;
	}

	private notifySubScribers(newEvent: SavedEvent) {
		for (const subscriber of this.subscribers) {
			if (
				!(
					(!subscriber.aggregateId ||
						subscriber.aggregateId === newEvent.aggregateId) &&
					(!subscriber.aggregateName ||
						subscriber.aggregateName === newEvent.aggregateName) &&
					(!subscriber.eventName ||
						subscriber.eventName === newEvent.eventName)
				)
			) {
				continue;
			}

			subscriber.onNewEvent(newEvent);
		}
	}

	public insertUncommittedEvent(newEvent: EventTrunk) {
		const nextVersion = this.getNextVersion(newEvent.aggregateId);

		const savedEvent: SavedEvent = {
			aggregateId: newEvent.aggregateId,
			aggregateName: newEvent.aggregateName,
			aggregateVersion: newEvent.aggregateVersion,
			eventName: newEvent.eventName,
			data: newEvent.data,
			version: nextVersion,
			eventTime: new Date()
		};

		this.uncommittedEvents.push(savedEvent);
	}

	replayEvents(args?: {}) {}

	async commit() {
		await this.eventStorage.addEvent(this.uncommittedEvents);

		const uncommittedEventsCount = this.uncommittedEvents.length;

		for (let i = 0; i < uncommittedEventsCount + 1; i++) {
			const e = this.uncommittedEvents.shift();
			if (!e) {
				continue;
			}

			this.notifySubScribers(e);
		}
	}

	public subscribeToEvents(
		options: SubscribeToEventsOptions,
		onNewEvent: OnNewEvent
	) {
		const currentSubscriberIndex = this.nextSubscriberIndex++;

		this.subscribers.push({
			subscriberIndex: currentSubscriberIndex,
			aggregateId: options.aggregateId,
			aggregateName: options.aggregateName,
			eventName: options.eventName,
			onNewEvent: onNewEvent
		});

		const unsubscribe = async () => {
			this.subscribers = this.subscribers.filter(
				p => p.subscriberIndex !== currentSubscriberIndex
			);
		};

		return {
			unsubscribe: unsubscribe.bind(this)
		};
	}
}
