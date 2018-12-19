import { EventSourcedObject } from "./EventSourcedObject";
import { EventStore } from "./EventStore";

export class EventSourcedObjectRepository {
	private eventStore: EventStore;

	private uncommitedEventSourcedObjects: EventSourcedObject[];

	constructor(args: { eventStore: EventStore }) {
		this.uncommitedEventSourcedObjects = [];
		this.eventStore = args.eventStore;
	}

	save(eventSourcedObject: EventSourcedObject | EventSourcedObject[]) {
		if (!(eventSourcedObject instanceof Array)) {
			this.uncommitedEventSourcedObjects.push(eventSourcedObject);

			return;
		}

		for (const ob of eventSourcedObject) {
			this.uncommitedEventSourcedObjects.push(ob);
		}
	}

	async commit() {
		for (const ob of this.uncommitedEventSourcedObjects) {
			for (const u of ob.getUncommittedEvents()) {
				this.eventStore.insertUncommittedEvent(u);
			}
		}

		await this.eventStore.commit();

		for (const ob of this.uncommitedEventSourcedObjects) {
			ob.clearUncommittedEvents();
		}

		this.uncommitedEventSourcedObjects = [];
	}
}
