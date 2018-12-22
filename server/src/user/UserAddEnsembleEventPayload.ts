import { SavedEvent } from "../eventsourcing/SavedEvent";

export interface UserAddEnsembleEventPayload extends SavedEvent {
	data: {
		ensembleId: string;
	};
}
