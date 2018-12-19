import { EnsembleReader } from "./EnsembleReader";
import { MemoryEnsembleReaderState } from "./MemoryEnsembleReaderState";
import { EventStore } from "../eventsourcing/EventStore";
import { SavedEvent } from "../eventsourcing/SavedEvent";
import { EnsembleAggregateName } from "./EnsembleAggregateName";
import { EnsembleEvents } from "./EnsembleEvents";
import { EnsembleObjectCreatedEventPayload } from "./EnsembleObjectCreatedEventPayload";
import { EnsembleObjectAddedEventPayload } from "./EnsembleObjectAddedEventPayload";
import { EnsembleUpdatedEventPayload } from "./EnsembleUpdatedEventPayload";
import { EnsembleCreatedEventPayload } from "./EnsembleCreatedEventPayload";

export class MemoryEnsembleReader implements EnsembleReader {
	private state: MemoryEnsembleReaderState;

	constructor(args: { eventStore: EventStore }) {
		this.state = {
			ensembleById: {},
			ensembleObjectsByEnsembleId: {}
		};

		args.eventStore.subscribeToEvents(
			{
				aggregateName: EnsembleAggregateName
			},
			this.handleEvent.bind(this)
		);
	}

	private handleEvent(newEvent: SavedEvent) {
		switch (newEvent.eventName) {
			case EnsembleEvents.ENSEMBLE_CREATED:
				break;
			case EnsembleEvents.ENSEMBLE_OBJECT_ADDED:
				this.handleEnsembleObjectAdded(newEvent);
				break;
			case EnsembleEvents.ENSEMBLE_OBJECT_CREATED:
				this.handleEnsembleObjectCreated(newEvent);
				break;
			case EnsembleEvents.ENSEMBLE_UPDATED:
				this.handleEnsembleUpdated(newEvent);
				break;
		}
	}

	private handleEnsembeCreated(newEvent: EnsembleCreatedEventPayload) {
		let ensemble = this.state.ensembleById[newEvent.aggregateId];

		if (ensemble) {
			ensemble.name = newEvent.data.name;
			return;
		}

		ensemble = {
			id: newEvent.aggregateId,
			name: newEvent.data.name
		};

		this.state.ensembleById[ensemble.id] = ensemble;
	}

	private handleEnsembleObjectCreated(
		newEvent: EnsembleObjectCreatedEventPayload
	) {}

	private handleEnsembleObjectAdded(
		newEvent: EnsembleObjectAddedEventPayload
	) {}

	private handleEnsembleUpdated(newEvent: EnsembleUpdatedEventPayload) {}

	async fetchEnsemble(ensembleId: string) {
		return this.state.ensembleById[ensembleId];
	}

	async fetchEnsembleEnsembleObjects(ensembleId: string) {
		return this.state.ensembleObjectsByEnsembleId[ensembleId];
	}

	async fetchEnsemblesByIds(ensembleIds: string[]) {
		return ensembleIds.map(p => this.state.ensembleById[p]);
	}
}
