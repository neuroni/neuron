import { EventSourcedObjectRepository } from "../eventsourcing/EventSourcedObjectRepository";
import { NoteFactory } from "./NoteFactory";
import { NoteRepository } from "./NoteRepository";
import { NoteService } from "./NoteService";
import { RowLineBreak } from "./RowLineBreak";
import { RowText } from "./RowText";

export class DomainNoteService implements NoteService {
	private noteFactory: NoteFactory;
	private noteRepository: NoteRepository;
	private eventSourcedObjectReposity: EventSourcedObjectRepository;

	constructor(args: {
		noteFactory: NoteFactory;
		noteRepository: NoteRepository;
		eventSourcedObjectRepository: EventSourcedObjectRepository;
	}) {
		this.noteFactory = args.noteFactory;
		this.noteRepository = args.noteRepository;
		this.eventSourcedObjectReposity = args.eventSourcedObjectRepository;
	}

	async createNote(args: { name: string }) {
		const note = this.noteFactory.createNew({
			name: args.name
		});

		this.eventSourcedObjectReposity.save(note);

		await this.eventSourcedObjectReposity.commit();

		return note.getId();
	}

	async updateNote(args: {
		noteId: string;
		name?: string;
		updatedNoteRows?: {
			rowNumber: number;
			rowText?: string;
			onlyLineChange?: boolean;
			lineRemoved?: boolean;
		}[];
	}) {
		const note = await this.noteRepository.fetchById(args.noteId);

		if (!note) {
			return;
		}

		if (args.name) {
			note.setName(args.name);
		}

		if (args.updatedNoteRows) {
			for (const updatedNoteRow of args.updatedNoteRows) {
				if (updatedNoteRow.onlyLineChange) {
					const newLineBreak = new RowLineBreak();

					note.saveRow(updatedNoteRow.rowNumber, newLineBreak);

					continue;
				}

				if (updatedNoteRow.lineRemoved) {
					note.removeRow(updatedNoteRow.rowNumber);

					continue;
				}

				if (updatedNoteRow.rowText) {
					const newTextRow = new RowText({
						text: updatedNoteRow.rowText
					});

					note.saveRow(updatedNoteRow.rowNumber, newTextRow);

					continue;
				}
			}
		}

		this.eventSourcedObjectReposity.save(note);

		await this.eventSourcedObjectReposity.commit();
	}

	async removeNote(noteId: string) {
		const note = await this.noteRepository.fetchById(noteId);

		if (!note) {
			return;
		}

		note.remove();

		this.eventSourcedObjectReposity.save(note);

		await this.eventSourcedObjectReposity.commit();
	}
}
