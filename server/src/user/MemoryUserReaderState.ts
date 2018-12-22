import { UserDto } from "./UserDto";

export interface MemoryUserReaderState {
	userById: { [userId: string]: UserDto };
	userByName: { [userName: string]: UserDto };
	userEnsembles: { [userId: string]: string[] };
	adminUser?: UserDto | undefined;
}
