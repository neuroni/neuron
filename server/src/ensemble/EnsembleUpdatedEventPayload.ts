import { SavedEvent } from "../eventsourcing/SavedEvent";

export interface EnsembleUpdatedEventPayload extends SavedEvent {
	data: {
		name: string;
	};
}
