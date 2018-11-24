import { compare, hash } from "bcrypt";

export class User {
	private id: string;
	private name: string;
	private isAdmin: boolean;

	private passwordHash?: string;

	constructor(args: {
		id: string;
		name: string;
		isAdmin: boolean;
		passwordHash?: string;
	}) {
		this.id = args.id;
		this.name = args.name;
		this.isAdmin = args.isAdmin;
		this.passwordHash = args.passwordHash;
	}

	public getId() {
		return this.id;
	}

	public getName() {
		return this.name;
	}

	public getIsAdmin() {
		return this.isAdmin;
	}

	public getPasswordHash() {
		return this.passwordHash;
	}

	public async changePassword(newPlainPassword: string) {
		this.passwordHash = await hash(newPlainPassword, 10);
	}

	public async comparePassword(plainPassword: string) {
		if (!this.passwordHash) {
			return false;
		}
		const success = await compare(plainPassword, this.passwordHash);
		return success;
	}
}
