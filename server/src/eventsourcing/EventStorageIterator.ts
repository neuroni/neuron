import { SavedEvent } from "./SavedEvent";

export interface EventStorageIterator {
	[Symbol.asyncIterator]: () => {
		next(): Promise<{
			value: SavedEvent | undefined;
		}>;
	};
}
