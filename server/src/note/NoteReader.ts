import { NoteDto } from "./NoteDto";

export interface NoteReader {
	fetchNoteById(noteId: string): Promise<NoteDto | undefined>;
}
