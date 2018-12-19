import { SavedEvent } from "./SavedEvent";
import { EventStorageIterator } from "./EventStorageIterator";

export interface EventStorage {
	read(): EventStorageIterator;
	addEvent(event: SavedEvent | SavedEvent[]): Promise<void>;
}
