import { EnsembleReader } from "../ensemble/EnsembleReader";
import { EnsembleRelationCoordinatorReader } from "../ensemble/EnsembleRelationCoordinatorReader";
import { EnsembleService } from "../ensemble/EnsembleService";
import { RemoveEnsemble } from "../ensemble/removeEnsemble";
import { UserReader } from "../user/UserReader";
import { UserService } from "../user/UserService";

export class Context {
	public readonly removeEnsemble: RemoveEnsemble;
	public readonly ensembleRelationCoordinatorReader: EnsembleRelationCoordinatorReader;
	public readonly ensembleService: EnsembleService;
	public readonly userService: UserService;

	public readonly ensembleReader: EnsembleReader;
	public readonly userReader: UserReader;

	public readonly session: any;

	constructor(args: {
		session: any;
		userReader: UserReader;
		ensembleReader: EnsembleReader;
		userService: UserService;
		ensembleService: EnsembleService;
	}) {
		this.session = args.session;
		this.userReader = args.userReader;
		this.ensembleReader = args.ensembleReader;
		this.userService = args.userService;
		this.ensembleService = args.ensembleService;
	}

	public setCurrentUserId(userId: string) {
		this.session.currentUserId = userId;
	}

	public getCurrentUserId() {
		return this.session.currentUserId;
	}

	public clearCurrentUserId() {
		this.session.currentUserId = undefined;
	}
}
