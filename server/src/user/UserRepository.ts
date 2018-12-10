import { User } from "./User";

export interface UserRepository {
	fetchAdmin(): Promise<User | undefined>;
	fetchUserById(userId: string): Promise<User | undefined>;
	fetchUserByName(userName: string): Promise<User | undefined>;
	save(user: User): Promise<void>;
}
