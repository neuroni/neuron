import { EventStore } from "../eventsourcing/EventStore";
import { MemoryNoteReaderState } from "./MemoryNoteReaderState";
import { NoteAggregateName } from "./NoteAggregateName";
import { NoteCreatedEventPayload } from "./NoteCreatedEventPayload";
import { NoteEvents } from "./NoteEvents";
import { NoteReader } from "./NoteReader";
import { NoteRow } from "../schemadef";
import { NoteUpdatedEventPayload } from "./NoteUpdatedEventPayload";
import { RowDto } from "./RowDto";
import { SavedEvent } from "../eventsourcing/SavedEvent";

export class MemoryNoteReader implements NoteReader {
	private state: MemoryNoteReaderState;

	constructor(args: { eventStore: EventStore }) {
		args.eventStore.subscribeToEvents(
			{
				aggregateName: NoteAggregateName
			},
			this.handleEvent.bind(this)
		);

		this.state = {
			noteById: new Map(),
			noteRows: new Map()
		};
	}

	handleEvent(newEvent: SavedEvent) {
		switch (newEvent.eventName) {
			case NoteEvents.NOTE_CREATED:
				this.handleNoteCreated(newEvent);
				break;
			case NoteEvents.NOTE_UPDATED:
				this.handleNoteUpdated(newEvent);
				break;
			case NoteEvents.NOTE_REMOVED:
				this.handleNoteRemoved(newEvent);
				break;
		}
	}

	handleNoteCreated(newEvent: NoteCreatedEventPayload) {
		let note = this.state.noteById[newEvent.aggregateId];

		if (!note) {
			note = {
				id: newEvent.aggregateId,
				name: newEvent.data.name
			};

			this.state.noteById.set(newEvent.aggregateId, note);

			return;
		}

		note.name = newEvent.data.name;
	}

	handleNoteUpdated(newEvent: NoteUpdatedEventPayload) {
		if (newEvent.data.newName) {
			const note = this.state.noteById[newEvent.aggregateId];

			if (note) {
				note.name = newEvent.data.newName;
			}
		}

		if (!newEvent.data.updatedNoteRows) {
			return;
		}

		let noteRows = this.state.noteRows.get(newEvent.aggregateId);

		if (!noteRows) {
			noteRows = new Map<number, RowDto>();
			this.state.noteRows.set(newEvent.aggregateId, noteRows);
		}

		for (const updatedNoteRow of newEvent.data.updatedNoteRows) {
			if (updatedNoteRow.lineRemoved) {
				noteRows.delete(updatedNoteRow.rowNumber);
				continue;
			}

			if (updatedNoteRow.onlyLineChange) {
				noteRows.set(updatedNoteRow.rowNumber, {
					rowNumber: updatedNoteRow.rowNumber,
					text: ""
				});
				continue;
			}

			if (updatedNoteRow.rowText) {
				noteRows.set(updatedNoteRow.rowNumber, {
					rowNumber: updatedNoteRow.rowNumber,
					text: updatedNoteRow.rowText
				});
				continue;
			}
		}
	}

	handleNoteRemoved(newEvent: SavedEvent) {
		this.state.noteById.delete(newEvent.aggregateId);
		this.state.noteRows.delete(newEvent.aggregateId);
	}

	async fetchNoteById(noteId: string) {
		return this.state.noteById.get(noteId);
	}

	async fetchNoteRows(noteId: string) {
		const rows = this.state.noteRows.get(noteId);

		if (!rows) {
			return [];
		}

		return Array.from(rows.values());
	}
}
