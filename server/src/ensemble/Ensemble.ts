import { CurrentEnsembleAggregateVersion } from "./CurrentEnsembleAggregateVersion";
import { EnsembleAggregateName } from "./EnsembleAggregateName";
import { EnsembleEvents } from "./EnsembleEvents";
import { EnsembleObject } from "./EnsembleObject";
import { EventSourcedObject } from "../eventsourcing/EventSourcedObject";
import { EventTrunk } from "../eventsourcing/EventTrunk";

export class Ensemble extends EventSourcedObject implements EnsembleObject {
	private id: string;
	private name: string;

	constructor(args: { id: string; name: string; events?: EventTrunk[] }) {
		super({
			aggregateId: args.id,
			aggregateName: EnsembleAggregateName,
			currentAggregateSchemaVersion: CurrentEnsembleAggregateVersion,
			events: args.events
		});

		this.id = args.id;
		this.name = args.name;
	}

	get type() {
		return "Ensemble";
	}

	public getId() {
		return this.id;
	}

	public setName(newName: string) {
		this.name = newName;

		this.insertUncommittedEvent({
			eventName: EnsembleEvents.ENSEMBLE_UPDATED,
			data: {
				name: newName
			}
		});
	}

	public getName() {
		return this.name;
	}

	public createEnsembleObject(args: {
		id: string;
		name: string;
		type: string;
	}) {
		this.insertUncommittedEvent({
			eventName: EnsembleEvents.ENSEMBLE_OBJECT_CREATED,
			data: {
				id: args.id,
				name: args.name,
				type: args.type
			}
		});
	}

	public addEnsembleObject(args: { ensembleObject: EnsembleObject }) {
		this.insertUncommittedEvent({
			eventName: EnsembleEvents.ENSEMBLE_OBJECT_ADDED,
			data: {
				ensembleObjectId: args.ensembleObject.getId()
			}
		});
	}

	public remove() {
		this.insertUncommittedEvent({
			eventName: EnsembleEvents.ENSEMBLE_REMOVED,
			data: {}
		});
	}
}
