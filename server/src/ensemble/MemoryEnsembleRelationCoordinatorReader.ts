import { DataStore } from "mockdatastore";
import { EnsembleRelationCoordinatorReader } from "./EnsembleRelationCoordinatorReader";

interface UserRootEnsemble {
	userId: string;
	ensembleId: string;
}
interface EnsembleObjectEntity {
	id: string;
	name: string;
	type: string;
	ensembleId: string;
}

export class MemoryEnsembleRelationCoordinatorReader
	implements EnsembleRelationCoordinatorReader {
	private dataStore: DataStore;

	constructor(args: { dataStore: DataStore }) {
		this.dataStore = args.dataStore;
	}

	async fetchUserRootEnsembleIds(userId: string) {
		const userRootEnsembles = this.dataStore.getFilttered<UserRootEnsemble>(
			"userRootEnsemble",
			p => p.userId === userId
		);

		if (!userRootEnsembles) {
			return [];
		}

		return userRootEnsembles.map(p => p.ensembleId);
	}

	async fetchEnsembleEnsembleObjects(ensembleId: string) {
		const ensembleObjects = this.dataStore.getFilttered<
			EnsembleObjectEntity
		>("ensembleObject", p => p.ensembleId === ensembleId);

		return ensembleObjects;
	}
}
