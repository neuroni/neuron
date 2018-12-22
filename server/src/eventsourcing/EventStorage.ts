import { EventStorageIterator } from "./EventStorageIterator";
import { SavedEvent } from "./SavedEvent";

export interface EventStorage {
	read(onNewEvent: (newEvent: SavedEvent) => void): void;
	addEvent(event: SavedEvent | SavedEvent[]): Promise<void>;
}
