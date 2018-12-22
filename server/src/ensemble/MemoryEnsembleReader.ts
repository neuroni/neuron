import { EnsembleAggregateName } from "./EnsembleAggregateName";
import { EnsembleCreatedEventPayload } from "./EnsembleCreatedEventPayload";
import { EnsembleDto } from "./EnsembleDto";
import { EnsembleEvents } from "./EnsembleEvents";
import { EnsembleObjectAddedEventPayload } from "./EnsembleObjectAddedEventPayload";
import { EnsembleObjectCreatedEventPayload } from "./EnsembleObjectCreatedEventPayload";
import { EnsembleReader } from "./EnsembleReader";
import { EnsembleUpdatedEventPayload } from "./EnsembleUpdatedEventPayload";
import { EventStore } from "../eventsourcing/EventStore";
import { MemoryEnsembleReaderState } from "./MemoryEnsembleReaderState";
import { SavedEvent } from "../eventsourcing/SavedEvent";

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
				this.handleEnsembeCreated(newEvent);
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
	) {
		let ensembleEnsembleObjects = this.state.ensembleObjectsByEnsembleId[
			newEvent.aggregateId
		];

		if (!ensembleEnsembleObjects) {
			ensembleEnsembleObjects = [];
			this.state.ensembleObjectsByEnsembleId[
				newEvent.aggregateId
			] = ensembleEnsembleObjects;
		}

		ensembleEnsembleObjects.push({
			id: newEvent.data.id,
			name: newEvent.data.name,
			type: newEvent.data.type
		});
	}

	private handleEnsembleObjectAdded(
		newEvent: EnsembleObjectAddedEventPayload
	) {}

	private handleEnsembleUpdated(newEvent: EnsembleUpdatedEventPayload) {}

	async fetchEnsemble(ensembleId: string) {
		return this.state.ensembleById[ensembleId];
	}

	async fetchEnsembleEnsembleObjects(ensembleId: string) {
		return this.state.ensembleObjectsByEnsembleId[ensembleId] || [];
	}

	async fetchEnsemblesByIds(ensembleIds: string[]) {
		const ensembles: EnsembleDto[] = [];

		ensembleIds.forEach(p => {
			const e = this.state.ensembleById[p];
			if (!e) {
				return;
			}

			ensembles.push(e);
		});

		return ensembles;
	}
}
