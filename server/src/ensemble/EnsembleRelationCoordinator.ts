import { Ensemble } from "./Ensemble";
import { EnsembleObject } from "./EnsembleObject";
import { User } from "../user/User";

export interface EnsembleRelationCoordinator {
	addEnsembleObjectToEnsemble(args: {
		ensembleObject: EnsembleObject;
		ensemble: Ensemble;
	}): Promise<void>;

	addRootEnsembleForUser(args: {
		ensemble: Ensemble;
		user: User;
	}): Promise<void>;
}
