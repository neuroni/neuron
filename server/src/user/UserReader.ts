import { UserDto } from "./UserDto";

export interface UserReader {
	hasSystemAdminUser(): Promise<boolean>;
	fetchUserById(userId: string): Promise<UserDto | undefined>;
	fetchUsersByIds(userIds: string[]): Promise<UserDto[]>;
}
