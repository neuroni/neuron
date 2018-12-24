import { SavedEvent } from "../eventsourcing/SavedEvent";

export interface NoteUpdatedEventPayload extends SavedEvent {
	data: {
		newName?: string;
		updatedNoteRows?: Array<{
			rowNumber: number;
			rowText?: string;
			onlyLineChange?: boolean;
			lineRemoved?: boolean;
		}>;
	};
}
