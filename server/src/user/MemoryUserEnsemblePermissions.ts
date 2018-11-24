import { DataStore } from "mockdatastore";
import { Ensemble } from "../ensemble/Ensemble";
import { User } from "./User";
import { UserEnsemblePermissions } from "./UserEnsemblePermissions";

interface UserEnsemblePermission {
	userId: string;
	ensembleId: string;
}

export class MemoryUserEnsemblePermissions implements UserEnsemblePermissions {
	private dataStore: DataStore;

	constructor(args: { dataStore: DataStore }) {
		this.dataStore = args.dataStore;
	}

	async hasUserAddPermissionToEnsemble(args: {
		user: User;
		ensemble: Ensemble;
	}): Promise<boolean> {
		const userEnsemblePermission = this.dataStore.findEntity<
			UserEnsemblePermission
		>(
			"userEnsemblePermission",
			p =>
				p.userId == args.user.getId() &&
				p.ensembleId == args.ensemble.getId()
		);

		return userEnsemblePermission != null;
	}

	async hasUserRemoveEnsemblePermission(args: {
		user: User;
		ensemble: Ensemble;
	}): Promise<boolean> {
		const userRemoveEnsemblePermission = this.dataStore.findEntity<
			UserEnsemblePermission
		>(
			"userEnsembleRemovePermission",
			p =>
				p.userId === args.user.getId() &&
				p.ensembleId === args.ensemble.getId()
		);

		return userRemoveEnsemblePermission != null;
	}

	async hasUserAddPermissionsToEnsemble(args: {
		user: User;
		ensemble: Ensemble;
	}): Promise<boolean> {
		const userAddPermissionToEnsemble = this.dataStore.findEntity<
			UserEnsemblePermission
		>(
			"userAddPermissionToEnsemble",
			p =>
				p.ensembleId === args.ensemble.getId() &&
				p.userId === args.user.getId()
		);

		return userAddPermissionToEnsemble != null;
	}
}
