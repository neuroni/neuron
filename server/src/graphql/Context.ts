import { EnsembleReader } from "../ensemble/EnsembleReader";
import { EnsembleService } from "../ensemble/EnsembleService";
import { NoteReader } from "../note/NoteReader";
import { NoteService } from "../note/NoteService";
import { UserReader } from "../user/UserReader";
import { UserService } from "../user/UserService";

export class Context {
	public readonly ensembleService: EnsembleService;
	public readonly userService: UserService;
	public readonly noteService: NoteService;

	public readonly ensembleReader: EnsembleReader;
	public readonly userReader: UserReader;
	public readonly noteReader: NoteReader;

	public readonly session: any;

	constructor(args: {
		session: any;
		userReader: UserReader;
		ensembleReader: EnsembleReader;
		noteReader: NoteReader;
		userService: UserService;
		ensembleService: EnsembleService;
		noteService: NoteService;
	}) {
		this.session = args.session;
		this.userReader = args.userReader;
		this.ensembleReader = args.ensembleReader;
		this.userService = args.userService;
		this.ensembleService = args.ensembleService;
		this.noteReader = args.noteReader;
		this.noteService = args.noteService;
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
