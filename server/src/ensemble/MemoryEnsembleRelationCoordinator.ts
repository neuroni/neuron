import { DataStore } from "mockdatastore";
import { Ensemble } from "./Ensemble";
import { EnsembleObject } from "./EnsembleObject";
import { EnsembleRelationCoordinator } from "./EnsembleRelationCoordinator";
import { User } from "../user/User";

interface EnsembleObjectEnsemble {
	ensembleObjectId: string;
	ensembleId: string;
}

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

export class MemoryEnsembleRelationCoordinator
	implements EnsembleRelationCoordinator {
	private dataStore: DataStore;

	constructor(args: { dataStore: DataStore }) {
		this.dataStore = args.dataStore;
	}

	async addRootEnsembleForUser(args: { ensemble: Ensemble; user: User }) {
		const userRootEnsemble = {
			userId: args.user.getId(),
			ensembleId: args.ensemble.getId()
		};

		this.dataStore.pushBack("userRootEnsemble", userRootEnsemble);

		this.dataStore.save("database.json");
	}

	async addEnsembleObjectToEnsemble(args: {
		ensembleObject: EnsembleObject;
		ensemble: Ensemble;
	}) {
		const ensembleObjectEnsemble: EnsembleObjectEntity = {
			id: args.ensembleObject.getId(),
			name: args.ensembleObject.getName(),
			type: args.ensembleObject.type,
			ensembleId: args.ensemble.getId()
		};

		this.dataStore.pushBack("ensembleObject", ensembleObjectEnsemble);

		this.dataStore.save("database.json");
	}
}
