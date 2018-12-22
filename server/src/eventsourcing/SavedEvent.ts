import { EventTrunk } from "./EventTrunk";

export interface SavedEvent extends EventTrunk {
	aggregateVersion: number;
	eventTime: Date;
}
