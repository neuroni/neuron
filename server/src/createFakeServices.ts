import { DataStore } from "mockdatastore";
import { EventStore } from "./eventstore/EventStore";
import { IEventStore } from "./eventstore/IEventStore";
import { MemoryEnsembleReader } from "./ensemble/MemoryEnsembleReader";
import { MemoryEnsembleRelationCoordinator } from "./ensemble/MemoryEnsembleRelationCoordinator";
import { MemoryEnsembleRelationCoordinatorReader } from "./ensemble/MemoryEnsembleRelationCoordinatorReader";
import { MemoryEnsembleRepository } from "./ensemble/MemoryEnsembleRepository";
import { MemoryUserEnsemblePermissions } from "./user/MemoryUserEnsemblePermissions";
import { MemoryUserReader } from "./user/MemoryUserReader";
import { MemoryUserRepository } from "./user/MemoryUserRepository";
import { UidGenerator } from "./common/UidGenerator";
import { User } from "./user/User";
import { UserRepository } from "./user/UserRepository";
import { createAddEnsembleToEnsemble } from "./ensemble/addEnsembleToEnsemble";
import { createCheckUserLogin } from "./user/checkUserLogin";
import { createCreateAdminUser } from "./user/createAdminUser";
import { createCreateEnsembleForUser } from "./ensemble/createEnsembleForUser";
import { createCreateEnsembleToEnsemble } from "./ensemble/createEnsembleToEnsemble";

export const createGetCurrentUser = ({
	userRepository,
	currentUserId
}: {
	userRepository: UserRepository;
	currentUserId?: string;
}) => {
	let fetched = false;

	let user: User | undefined = undefined;

	return async () => {
		if (fetched) {
			return user;
		}

		if (!currentUserId) {
			return undefined;
		}

		user = await userRepository.fetchUserById(currentUserId);
		fetched = true;

		return user;
	};
};

export const createFakeServices = async (args?: {
	eventStore?: IEventStore;
	dataStore?: DataStore;
	currentUserId?: string;
}) => {
	const eventStore = (args && args.eventStore) || new EventStore();

	const dataStore = (args && args.dataStore) || new DataStore({});

	const userRepository = new MemoryUserRepository({
		dataStore: dataStore
	});

	const getCurrentUser = createGetCurrentUser({
		currentUserId: args && args.currentUserId,
		userRepository: userRepository
	});

	const ensembleRepository = new MemoryEnsembleRepository({
		dataStore: dataStore
	});

	const userReader = new MemoryUserReader({
		dataStore: dataStore
	});

	const ensembleRelationCoordinator = new MemoryEnsembleRelationCoordinator({
		dataStore: dataStore
	});

	const ensembleReader = new MemoryEnsembleReader({
		dataStore: dataStore
	});

	const userEnsemblePermissions = new MemoryUserEnsemblePermissions({
		dataStore: dataStore
	});

	const uidGenerator = new UidGenerator();

	const createAdminUser = createCreateAdminUser({
		uidGenerator: uidGenerator,
		userRepository: userRepository
	});

	const checkUserLogin = createCheckUserLogin({
		userRepository: userRepository
	});

	const createEnsembleForUser = createCreateEnsembleForUser({
		ensembleRepository: ensembleRepository,
		eventStore: eventStore,
		uidGenerator: uidGenerator,
		userEnsemblePermissions: userEnsemblePermissions,
		getCurrentUser: getCurrentUser,
		ensembleRelationCoordinator: ensembleRelationCoordinator
	});

	const createEnsembleToEnsemble = createCreateEnsembleToEnsemble({
		ensembleRepository: ensembleRepository,
		eventStore: eventStore,
		ensembleRelationCoordinator: ensembleRelationCoordinator,
		getCurrentUser: getCurrentUser,
		uidGenerator: uidGenerator
	});

	const addEnsembleToEnsemble = createAddEnsembleToEnsemble({
		ensembleRepository: ensembleRepository
	});

	const ensembleRelationCoordinatorReader = new MemoryEnsembleRelationCoordinatorReader(
		{
			dataStore: dataStore
		}
	);

	return {
		createAdminUser,
		checkUserLogin,
		userReader,
		createEnsembleForUser,
		createEnsembleToEnsemble,
		addEnsembleToEnsemble,
		ensembleReader,
		ensembleRelationCoordinatorReader
	};
};
