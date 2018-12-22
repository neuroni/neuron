import { UserDto } from "./UserDto";

export interface MemoryUserReaderState {
	userById: { [userId: string]: UserDto };
	userByName: { [userName: string]: UserDto };
	adminUser?: UserDto | undefined;
}
