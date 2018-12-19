import { SavedEvent } from "../eventsourcing/SavedEvent";

export interface EnsembleObjectAddedEventPayload extends SavedEvent {
	data: {
		ensembleObjectId: string;
	};
}
