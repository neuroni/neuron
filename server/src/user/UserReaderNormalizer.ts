import { SavedEvent } from "../eventsourcing/SavedEvent";

export interface UserReaderNormalizer {
	handleEvent(newEvent: SavedEvent);
}
