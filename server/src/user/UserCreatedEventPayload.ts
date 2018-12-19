import { SavedEvent } from "../eventsourcing/SavedEvent";

export interface UserCreatedEventData {
	userName: string;
	passwordHash?: string;
	isAdmin: boolean;
}

export interface UserCreatedEventPayload extends SavedEvent {
	data: UserCreatedEventData;
}
