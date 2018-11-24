export interface UserDto {
	id: string;
	name: string;
	isAdmin: boolean;
	passwordHash?: string;
}
