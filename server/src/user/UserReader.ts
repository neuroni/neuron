import { UserDto } from "./UserDto";

export interface UserReader {
	hasSystemAdminUser(): Promise<boolean>;
	fetchUserById(userId: string): Promise<UserDto | undefined>;
	fetchUsersByIds(userIds: string[]): Promise<UserDto[]>;
	fetchAdminUser(): Promise<UserDto | undefined>;
	fetchUserByUserName(userName: string): Promise<UserDto>;
	fetchUserEnsembleIds(userId: string): Promise<string[]>;
}
