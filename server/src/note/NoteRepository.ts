import { NoteFactory } from "./NoteFactory";
import { NoteReader } from "./NoteReader";

export class NoteRepository {
	private noteReader: NoteReader;
	private noteFactory: NoteFactory;

	constructor(args: { noteReader: NoteReader; noteFactory: NoteFactory }) {
		this.noteReader = args.noteReader;
		this.noteFactory = args.noteFactory;
	}

	async fetchById(noteId: string) {
		const note = await this.noteReader.fetchNoteById(noteId);

		if (!note) {
			return undefined;
		}

		return this.noteFactory.regenerateOld(note);
	}
}
