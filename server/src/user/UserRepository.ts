import { UserFactory } from "./UserFactory";
import { UserReader } from "./UserReader";

export class UserRepository {
	private userReader: UserReader;
	private userFactory: UserFactory;

	constructor(args: { userReader: UserReader; userFactory: UserFactory }) {
		this.userReader = args.userReader;
		this.userFactory = args.userFactory;
	}

	async fetchAdmin() {
		const user = await this.userReader.fetchAdminUser();

		if (!user) {
			return undefined;
		}

		return this.userFactory.regenerateOld(user);
	}

	async fetchUserById(userId: string) {
		const user = await this.userReader.fetchUserById(userId);

		if (!user) {
			return undefined;
		}

		return this.userFactory.regenerateOld(user);
	}

	async fetchUserByName(userName: string) {
		const user = await this.userReader.fetchUserByUserName(userName);

		if (!user) {
			return undefined;
		}

		return this.userFactory.regenerateOld(user);
	}
}
