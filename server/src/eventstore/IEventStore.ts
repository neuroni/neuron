import { EventRow } from "./EventRow";

export interface IEventStore {
	commit(args: { aggregateId: string; eventType: string; data: any });
	subscribe(eventType: string, newEvent: (newEvent: EventRow) => void);
}
