import { EventTrunk } from "./EventTrunk";

export abstract class EventSourcedObject {
	private aggregateId: string;
	private aggregateName: string;
	private aggregateVersion: number;
	private uncommittedEvents: EventTrunk[];

	constructor(args: {
		aggregateId: string;
		aggregateName: string;
		aggregateVersion: number;
		events?: EventTrunk[];
	}) {
		this.aggregateId = args.aggregateId;
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
			aggregateVersion: this.aggregateVersion,
			eventName: args.eventName,
			data: args.data
		});
	}


}
