import { SavedEvent } from "../eventsourcing/SavedEvent";

export interface NoteCreatedEventPayload extends SavedEvent {
	data: {
		name: string;
	};
}
