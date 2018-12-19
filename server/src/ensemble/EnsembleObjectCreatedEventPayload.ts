import { SavedEvent } from "../eventsourcing/SavedEvent";

export interface EnsembleObjectCreatedEventPayload extends SavedEvent {
	data: {
		name: string;
		type: string;
	};
}
