import { DataStore } from "mockdatastore";
import { User } from "./User";
import { UserDto } from "./UserDto";
import { UserRepository } from "./UserRepository";

export class MemoryUserRepository implements UserRepository {
	private dataStore: DataStore;

	constructor(args: { dataStore: DataStore }) {
		this.dataStore = args.dataStore;
	}

	async fetchAdmin() {
		const userDto = this.dataStore.findEntity<UserDto>(
			"user",
			p => p.isAdmin === true
		);

		if (!userDto) {
			return undefined;
		}

		return new User(userDto);
	}

	async fetchUserById(userId: string) {
		const userDto = this.dataStore.findEntity<UserDto>(
			"user",
			p => p.id === userId
		);

		if (!userDto) {
			return undefined;
		}

		return new User(userDto);
	}

	async fetchUserByName(userName: string) {
		const userDto = this.dataStore.findEntity<UserDto>(
			"user",
			p => p.name === userName
		);

		if (!userDto) {
			return undefined;
		}

		return new User(userDto);
	}

	async save(user: User) {
		if (
			this.dataStore.findEntity<UserDto>("user", p => {
				return p.id === user.getId();
			})
		) {
			return;
		}

		this.dataStore.pushBack<UserDto>("user", {
			id: user.getId(),
			isAdmin: user.getIsAdmin(),
			name: user.getName(),
			passwordHash: user.getPasswordHash()
		});
		await this.dataStore.save("database.json");
	}
}
