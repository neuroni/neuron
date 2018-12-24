import { SavedEvent } from "../eventsourcing/SavedEvent";

export interface NoteUpdatedEventPayload extends SavedEvent {
	data: {
		newName?: string;
		rowNumber?: number;
		rowText?: string;
	};
}
