import { DataStore } from "mockdatastore";
import { User } from "./User";
import { UserDto } from "./UserDto";
import { UserReader } from "./UserReader";

export class MemoryUserReader implements UserReader {
	private dataStore: DataStore;

	constructor(args: { dataStore: DataStore }) {
		this.dataStore = args.dataStore;
	}

	async hasSystemAdminUser() {
		const adminUser = this.dataStore.findEntity<UserDto>(
			"user",
			p => p.isAdmin === true
		);

		return adminUser != null;
	}

	async fetchUserById(userId: string) {
		const user = this.dataStore.findEntity<UserDto>(
			"user",
			p => p.id === userId
		);

		if (!user) {
			return undefined;
		}

		return user;
	}

	async fetchUsersByIds(userIds: string[]) {
		const users = this.dataStore.getFilttered<UserDto>("user", p =>
			userIds.some(e => e === p.id)
		);

		return users;
	}
}
