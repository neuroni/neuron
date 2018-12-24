import { NoteDto } from "./NoteDto";
import { RowDto } from "./RowDto";

export interface NoteReader {
	fetchNoteById(noteId: string): Promise<NoteDto | undefined>;
	fetchNoteRows(noteId: string): Promise<RowDto[]>;
}
