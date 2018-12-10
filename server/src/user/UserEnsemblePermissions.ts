import { Ensemble } from "../ensemble/Ensemble";
import { User } from "./User";

export interface UserEnsemblePermissions {
	hasUserAddPermissionToEnsemble(args: {
		user: User;
		ensemble: Ensemble;
	}): Promise<boolean>;

	hasUserRemoveEnsemblePermission(args: {
		user: User;
		ensemble: Ensemble;
	}): Promise<boolean>;

	hasUserAddPermissionsToEnsemble(args: {
		user: User;
		ensemble: Ensemble;
	}): Promise<boolean>;
}
