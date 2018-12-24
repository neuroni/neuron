import { EventStore } from "../eventsourcing/EventStore";
import { MemoryNoteReaderState } from "./MemoryNoteReaderState";
import { NoteAggregateName } from "./NoteAggregateName";
import { NoteCreatedEventPayload } from "./NoteCreatedEventPayload";
import { NoteEvents } from "./NoteEvents";
import { NoteReader } from "./NoteReader";
import { NoteUpdatedEventPayload } from "./NoteUpdatedEventPayload";
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
			noteById: {},
			noteRows: {}
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

			this.state.noteById[newEvent.aggregateId] = note;

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

		if (!newEvent.data.rowNumber || !newEvent.data.rowText) {
			return;
		}

		let noteRows = this.state.noteRows[newEvent.aggregateId];

		if (!noteRows) {
			noteRows = [];
			this.state.noteRows[newEvent.aggregateId] = noteRows;
		}

		let row = noteRows.find(p => p.rowNumber === newEvent.data.rowNumber);

		if (!row) {
			row = {
				rowNumber: newEvent.data.rowNumber,
				text: newEvent.data.rowText
			};
			noteRows.push(row);
			return;
		}

		row.text = newEvent.data.rowText;
	}

	handleNoteRemoved(newEvent: SavedEvent) {
		this.state.noteById[newEvent.aggregateId] = undefined;
	}

	async fetchNoteById(noteId: string) {
		return this.state.noteById[noteId];
	}

	async fetchNoteRows(noteId: string) {
		return this.state.noteRows[noteId] || [];
	}
}
