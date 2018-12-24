import { CurrentNoteAggregateVersion } from "./CurrentNoteAggregateVersion";
import { EventSourcedObject } from "../eventsourcing/EventSourcedObject";
import { EventTrunk } from "../eventsourcing/EventTrunk";
import { NoteAggregateName } from "./NoteAggregateName";
import { NoteEvents } from "./NoteEvents";
import { Row } from "./Row.ts";
import { RowLineBreak } from "./RowLineBreak";
import { RowText } from "./RowText";

export class Note extends EventSourcedObject {
	private id: string;
	private name: string;
	private rows: Map<number, Row>;

	constructor(args: {
		id: string;
		name: string;
		rows?: Map<number, Row>;
		events?: EventTrunk[];
	}) {
		super({
			aggregateId: args.id,
			aggregateName: NoteAggregateName,
			currentAggregateSchemaVersion: CurrentNoteAggregateVersion,
			events: args.events
		});

		this.id = args.id;
		this.name = args.name;
		this.rows = args.rows || new Map<number, Row>();
	}

	public getId() {
		return this.id;
	}

	public getName() {
		return this.name;
	}

	public setName(newName: string) {
		this.name = newName;

		const noteUpdatedEvent = this.getNoteUpdatedEvent();
		noteUpdatedEvent.data.newName;
	}

	public getRow(rowNumber: number) {
		return this.rows.get(rowNumber);
	}

	public removeRow(rowNumber: number) {
		this.rows.delete(rowNumber);

		const noteUpdatedEvent = this.getNoteUpdatedEvent();

		if (noteUpdatedEvent.data.updatedNoteRows) {
			noteUpdatedEvent.data.updatedNoteRows.filter(p => {
				p.rowNumber !== rowNumber;
			});
		}

		if (!noteUpdatedEvent.data.updatedNoteRows) {
			noteUpdatedEvent.data.updatedNoteRows = [];
		}

		noteUpdatedEvent.data.updatedNoteRows.push({
			rowNumber,
			lineRemoved: true
		});
	}

	public saveRow(rowNumber: number, row: Row) {
		this.rows.set(rowNumber, row);

		const noteUpdatedEvent = this.getNoteUpdatedEvent();
		if (!noteUpdatedEvent.data.updatedNoteRows) {
			noteUpdatedEvent.data.updatedNoteRows = [];
		}

		switch (row.constructor) {
			case RowText:
				const rowText = row as RowText;
				noteUpdatedEvent.data.updatedNoteRows.push({
					rowNumber: rowNumber,
					rowText: rowText.getText()
				});
				break;
			case RowLineBreak:
				noteUpdatedEvent.data.updatedNoteRows.push({
					rowNumber: rowNumber,
					onlyLineChange: true
				});
				break;
		}
	}

	public remove() {
		this.insertUncommittedEvent({
			data: {},
			eventName: NoteEvents.NOTE_REMOVED
		});
	}

	private getNoteUpdatedEvent(): {
		eventName: NoteEvents;
		data: {
			newName?: string;
			updatedNoteRows?: Array<{
				rowNumber: number;
				rowText?: string;
				onlyLineChange?: boolean;
				lineRemoved?: boolean;
			}>;
		};
	} {
		let noteUpdatedEvent: any = this.getUncommittedEvents().find(
			p => p.eventName === NoteEvents.NOTE_UPDATED
		);

		if (!noteUpdatedEvent) {
			noteUpdatedEvent = {
				eventName: NoteEvents.NOTE_UPDATED,
				data: {}
			};
			this.insertUncommittedEvent(noteUpdatedEvent);
		}

		return noteUpdatedEvent;
	}
}
