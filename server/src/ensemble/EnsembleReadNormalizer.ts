import { IEventStore } from "../eventstore/IEventStore";

export class EnsembleReadNormalizer {
	eventStore: IEventStore;

	constructor(args: { eventStore: IEventStore }) {}
}
