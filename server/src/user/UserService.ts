import { UserDto } from "./UserDto";

export interface UserService {
	addEnsembleForUser(args: {
		ensembleId: string;
		userId: string;
	}): Promise<void>;
	createAdminUser(args: { password: string }): Promise<string | undefined>;
	checkUserLogin(args: {
		userName: string;
		password: string;
	}): Promise<UserDto | undefined>;
}
