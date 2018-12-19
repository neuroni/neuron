import { UserDto } from "./UserDto";

export interface MemoryUserReaderState {
	userById: { [userId: string]: UserDto };
	adminUser?: UserDto | undefined;
}
