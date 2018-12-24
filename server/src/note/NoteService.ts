export interface NoteService {
	createNote(args: { name: string }): Promise<string | undefined>;
	updateNote(args: {
		noteId: string;
		name?: string;
		updatedNoteRows: {
			rowNumber: number;
			rowText: string;
		}[];
	}): Promise<void>;
	removeNote(noteId: string): Promise<void>;
}
