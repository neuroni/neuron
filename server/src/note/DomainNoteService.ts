import { EventSourcedObjectRepository } from "../eventsourcing/EventSourcedObjectRepository";
import { NoteFactory } from "./NoteFactory";
import { NoteRepository } from "./NoteRepository";
import { NoteService } from "./NoteService";

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
			rowText: string;
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
			args.updatedNoteRows.forEach(p => {
				const row = note.getRow(p.rowNumber);
				row.setText(p.rowText);
				note.saveRow(p.rowNumber, row);
			});
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
