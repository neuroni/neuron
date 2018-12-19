import { User } from "./User";
import { UidGenerator } from "../common/UidGenerator";
import { UserAggregateName } from "./UserAggregateName";
import { CurrentUserAggregateSchemaVersion } from "./CurrentUserAggregateSchemaVersion";
import {
	UserCreatedEventPayload,
	UserCreatedEventData
} from "./UserCreatedEventPayload";
import { UserEvents } from "./UserEvents";

export class UserFactory {
	private uidgenerator: UidGenerator;

	constructor(args: { uidGenerator: UidGenerator }) {
		this.uidgenerator = args.uidGenerator;
	}

	createNew(args: { name: string; isAdmin: boolean; passwordHash?: string }) {
		const aggregateId = this.uidgenerator.generateV4Guid();

		const data: UserCreatedEventData = {
			isAdmin: args.isAdmin,
			userName: args.name,
			passwordHash: args.passwordHash
		};

		return new User({
			id: aggregateId,
			name: args.name,
			isAdmin: args.isAdmin,
			passwordHash: args.passwordHash,
			events: [
				{
					aggregateId: aggregateId,
					aggregateName: UserAggregateName,
					aggregateVersion: CurrentUserAggregateSchemaVersion,
					eventName: UserEvents.USER_CREATED,
					data: data
				}
			]
		});
	}

	regenerateOld(args: {
		id: string;
		name: string;
		isAdmin: boolean;
		passwordHash?: string;
	}) {
		return new User(args);
	}
}
