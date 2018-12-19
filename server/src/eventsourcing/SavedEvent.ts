import { EventTrunk } from "./EventTrunk";

export interface SavedEvent extends EventTrunk {
	version: number;
	eventTime: Date;
}
