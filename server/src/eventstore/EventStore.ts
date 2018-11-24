import { EventEmitter } from "events";
import { EventRow } from "./EventRow";

export type AggregateRow = {
	columnName: string;
	aggregateId: string;
	type: string;
	version: number;
};

export class EventStore {
	private events: EventRow[] = [];

	private currentVersions = new Map<string, number>();

	private emitter: EventEmitter = new EventEmitter();

	private getNextVersion(aggregateId: string) {
		let currentVersion = this.currentVersions.get(aggregateId);
		if (!currentVersion) {
			currentVersion = 0;
		}
		currentVersion++;
		this.currentVersions.set(aggregateId, currentVersion);
		return currentVersion;
	}

	commit(args: { aggregateId: string; eventType: string; data: any }) {
		const nextVersion = this.getNextVersion(args.aggregateId);

		const newEvent: EventRow = {
			eventType: args.eventType,
			aggregateId: args.aggregateId,
			data: args.data,
			version: nextVersion,
			eventTime: new Date()
		};

		this.events.push(newEvent);

		this.emitter.emit(args.eventType, newEvent);
	}

	subscribe(eventType: string, newEvent: (newEvent: EventRow) => void) {
		this.emitter.on(eventType, newEvent);
	}
}
