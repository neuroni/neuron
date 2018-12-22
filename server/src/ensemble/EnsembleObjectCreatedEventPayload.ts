import { SavedEvent } from "../eventsourcing/SavedEvent";

export interface EnsembleObjectCreatedEventPayload extends SavedEvent {
	data: {
		id: string;
		name: string;
		type: string;
	};
}
