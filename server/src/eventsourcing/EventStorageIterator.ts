import { SavedEvent } from "./SavedEvent";

export interface EventStorageIterator {
	next(): Promise<SavedEvent | undefined>;
}
