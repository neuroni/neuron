import { CurrentNoteAggregateVersion } from "./CurrentNoteAggregateVersion";
import { Note } from "./Note";
import { NoteAggregateName } from "./NoteAggregateName";
import { NoteEvents } from "./NoteEvents";
import { Row } from "./Row.ts";
import { UidGenerator } from "../common/UidGenerator";

export class NoteFactory {
	private uidgenerator: UidGenerator;

	constructor(args: { uidgenerator: UidGenerator }) {
		this.uidgenerator = args.uidgenerator;
	}

	createNew(args: { name: string }) {
		const id = this.uidgenerator.generateV4Guid();

		return new Note({
			id: id,
			name: args.name,
			events: [
				{
					aggregateId: id,
					aggregateName: NoteAggregateName,
					currentAggregateSchemaVersion: CurrentNoteAggregateVersion,
					eventName: NoteEvents.NOTE_CREATED,
					data: {
						name: args.name
					}
				}
			]
		});
	}

	regenerateOld(args: { id: string; name: string; rows?: Map<number, Row> }) {
		return new Note({
			id: args.id,
			name: args.name,
			rows: args.rows
		});
	}
}
