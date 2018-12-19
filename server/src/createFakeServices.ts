import { DataStore } from "mockdatastore";
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
	const dataStore = (args && args.dataStore) || new DataStore({});

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

	return {
		ensembleReader
	};
};
