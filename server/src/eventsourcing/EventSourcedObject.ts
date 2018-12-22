import { EventTrunk } from "./EventTrunk";

export abstract class EventSourcedObject {
	private aggregateId: string;
	private aggregateName: string;
	private currentAggregateSchemaVersion: number;
	private uncommittedEvents: EventTrunk[];

	constructor(args: {
		aggregateId: string;
		aggregateName: string;
		currentAggregateSchemaVersion: number;
		events?: EventTrunk[];
	}) {
		this.aggregateId = args.aggregateId;
		this.aggregateName = args.aggregateName;
		this.currentAggregateSchemaVersion = args.currentAggregateSchemaVersion;
		this.uncommittedEvents = args.events || [];
	}

	public getUncommittedEvents() {
		return this.uncommittedEvents;
	}

	public clearUncommittedEvents() {
		this.uncommittedEvents = [];
	}

	protected insertUncommittedEvent(args: { eventName: string; data: any }) {
		this.uncommittedEvents.push({
			aggregateId: this.aggregateId,
			aggregateName: this.aggregateName,
			currentAggregateSchemaVersion: this.currentAggregateSchemaVersion,
			eventName: args.eventName,
			data: args.data
		});
	}
}
