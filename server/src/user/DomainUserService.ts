import { EventSourcedObjectRepository } from "../eventsourcing/EventSourcedObjectRepository";
import { UserDto } from "./UserDto";
import { UserFactory } from "./UserFactory";
import { UserRepository } from "./UserRepository";
import { UserService } from "./UserService";
import { hashPassword } from "../common/Crypto";

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

	async addEnsembleForUser(args: { ensembleId: string; userId: string }) {
		const user = await this.userRepository.fetchUserById(args.userId);

		if (!user) {
			return;
		}

		user.addEnsemble(args.ensembleId);

		this.eventSourcedObjectRepository.save(user);

		await this.eventSourcedObjectRepository.commit();
	}

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
	async checkUserLogin(args: {
		userName: string;
		password: string;
	}): Promise<UserDto | undefined> {
		const user = await this.userRepository.fetchUserByName(args.userName);

		if (!user) {
			return undefined;
		}

		if (!(await user.comparePassword(args.password))) {
			return undefined;
		}

		return {
			id: user.getId(),
			isAdmin: user.getIsAdmin(),
			name: user.getName()
		};
	}
}
