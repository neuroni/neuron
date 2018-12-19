import { UserService } from "./UserService";
import { UserRepository } from "./UserRepository";
import { UserFactory } from "./UserFactory";
import { hashPassword } from "../common/Crypto";
import { EventSourcedObjectRepository } from "../eventsourcing/EventSourcedObjectRepository";

export class DomainUserService implements UserService {
	private userRepository: UserRepository;
	private eventSourcedObjectRepository: EventSourcedObjectRepository;
	private userFactory: UserFactory;

	constructor(args: {
		userRepository: UserRepository;
		userFactory: UserFactory;
		eventSourcedObjectRepository: EventSourcedObjectRepository;
	}) {
		this.userRepository = args.userRepository;
		this.userFactory = args.userFactory;
		this.eventSourcedObjectRepository = args.eventSourcedObjectRepository;
	}

	async addEnsembleForUser(args: { ensembleId: string; userId: string }) {}
	async createAdminUser(args) {
		const currentAdminUser = await this.userRepository.fetchAdmin();

		if (currentAdminUser) {
			return undefined;
		}

		const passwordHash = await hashPassword(args.password);

		const newAdminUser = this.userFactory.createNew({
			name: "admin",
			isAdmin: true,
			passwordHash: passwordHash
		});

		this.eventSourcedObjectRepository.save(newAdminUser);

		await this.eventSourcedObjectRepository.commit();

		return newAdminUser.getId();
	}
	async checkUserLogin(args) {
		return undefined;
	}
}
