import { CheckUserLogin } from "../user/checkUserLogin";
import { CreateAdminUser } from "../user/createAdminUser";
import { CreateEnsembleForUser } from "../ensemble/createEnsembleForUser";
import { CreateEnsembleToEnsemble } from "../ensemble/createEnsembleToEnsemble";
import { EnsembleReader } from "../ensemble/EnsembleReader";
import { EnsembleRelationCoordinatorReader } from "../ensemble/EnsembleRelationCoordinatorReader";
import { RemoveEnsemble } from "../ensemble/removeEnsemble";
import { UserReader } from "../user/UserReader";

export class Context {
	public readonly createEnsembleForUser: CreateEnsembleForUser;
	public readonly createEnsembleToEnsemble: CreateEnsembleToEnsemble;
	public readonly removeEnsemble: RemoveEnsemble;
	public readonly createAdminUser: CreateAdminUser;
	public readonly checkUserLogin: CheckUserLogin;
	public readonly ensembleRelationCoordinatorReader: EnsembleRelationCoordinatorReader;

	public readonly ensembleReader: EnsembleReader;
	public readonly userReader: UserReader;

	public readonly session: any;

	constructor(args: {
		session: any;
		userReader: UserReader;
		createAdminUser: CreateAdminUser;
		checkUserLogin: CheckUserLogin;
		createEnsembleForUser: CreateEnsembleForUser;
		createEnsembleToEnsemble: CreateEnsembleToEnsemble;
		ensembleReader: EnsembleReader;
		ensembleRelationCoordinatorReader: EnsembleRelationCoordinatorReader;
	}) {
		this.session = args.session;
		this.userReader = args.userReader;
		this.createAdminUser = args.createAdminUser;
		this.checkUserLogin = args.checkUserLogin;
		this.createEnsembleForUser = args.createEnsembleForUser;
		this.createEnsembleToEnsemble = args.createEnsembleToEnsemble;
		this.ensembleReader = args.ensembleReader;
		this.ensembleRelationCoordinatorReader =
			args.ensembleRelationCoordinatorReader;
	}

	public setCurrentUserId(userId: string) {
		this.session.currentUserId = userId;
	}

	public getCurrentUserId() {
		return this.session.currentUserId;
	}
}
