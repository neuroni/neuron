import { NoteDto } from "./NoteDto";
import { RowDto } from "./RowDto";

export interface MemoryNoteReaderState {
	noteById: Map<string, NoteDto | undefined>;
	noteRows: Map<string, Map<number, RowDto>>;
}
