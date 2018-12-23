import { NoteDto } from "./NoteDto";
import { RowDto } from "./RowDto";

export interface MemoryNoteReaderState {
	noteById: { [noteId: string]: NoteDto | undefined };
	noteRows: { [noteId: string]: RowDto[] };
}
