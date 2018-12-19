import { UserReader } from "./UserReader";
import { EventStore } from "../eventsourcing/EventStore";
import { SavedEvent } from "../eventsourcing/SavedEvent";
import { UserAggregateName } from "./UserAggregateName";
import { UserEvents } from "./UserEvents";
import { UserCreatedEventPayload } from "./UserCreatedEventPayload";
import { MemoryUserReaderState } from "./MemoryUserReaderState";

export class MemoryUserReader implements UserReader {
	private state: MemoryUserReaderState;

	constructor(args: { eventStore: EventStore }) {
		this.state = {
			userById: {}
		};

		args.eventStore.subscribeToEvents(
			{
				aggregateName: UserAggregateName
			},
			this.handleEvent.bind(this)
		);
	}

	private handleEvent(newEvent: SavedEvent) {
		switch (newEvent.eventName) {
			case UserEvents.USER_CREATED:
				this.handleUserCreated(newEvent);
				break;
			case UserEvents.USER_ADD_ENSEMBLE:
				break;
		}
	}

	private handleUserCreated(userCreatedEvent: UserCreatedEventPayload) {
		let user = this.state.userById[userCreatedEvent.aggregateId];

		if (user) {
			if (!this.state.adminUser && userCreatedEvent.data.isAdmin) {
				this.state.adminUser = user;
			}

			user.isAdmin = userCreatedEvent.data.isAdmin;
			user.name = userCreatedEvent.data.userName;
			user.passwordHash = userCreatedEvent.data.passwordHash;

			return;
		}

		user = {
			id: userCreatedEvent.aggregateId,
			name: userCreatedEvent.data.userName,
			isAdmin: userCreatedEvent.data.isAdmin,
			passwordHash: userCreatedEvent.data.passwordHash
		};

		this.state.userById[user.id] = user;

		if (this.state.adminUser || !user.isAdmin) {
			return;
		}

		this.state.adminUser = user;
	}

	async hasSystemAdminUser() {
		return this.state.adminUser != null;
	}

	async fetchUserById(userId: string) {
		return this.state.userById[userId];
	}

	async fetchUsersByIds(userIds: string[]) {
		return userIds.map(p => this.state.userById[p]);
	}

	async fetchAdminUser() {
		return this.state.adminUser;
	}
}
