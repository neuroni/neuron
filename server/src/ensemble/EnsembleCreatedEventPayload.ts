import { SavedEvent } from "../eventsourcing/SavedEvent";

export interface EnsembleCreatedEventPayload extends SavedEvent {
	data: {
		name: string;
	};
}
