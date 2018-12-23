import { CurrentNoteAggregateVersion } from "./CurrentNoteAggregateVersion";
import { EventSourcedObject } from "../eventsourcing/EventSourcedObject";
import { EventTrunk } from "../eventsourcing/EventTrunk";
import { NoteAggregateName } from "./NoteAggregateName";
import { NoteEvents } from "./NoteEvents";
import { Row } from "./Row.ts";

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
		this.insertUncommittedEvent({
			data: {
				newName: newName
			},
			eventName: NoteEvents.NOTE_UPDATED
		});
	}

	public getRow(rowNumber: number) {
		let row = this.rows.get(rowNumber);
		if (!row) {
			row = new Row();
		}

		return row;
	}

	public saveRow(rowNumber: number, row: Row) {
		this.rows.set(rowNumber, row);
		this.insertUncommittedEvent({
			data: {
				rowNumber: rowNumber,
				rowText: row.getText()
			},
			eventName: NoteEvents.NOTE_UPDATED
		});
	}

	public remove() {
		this.insertUncommittedEvent({
			data: {},
			eventName: NoteEvents.NOTE_REMOVED
		});
	}
}
