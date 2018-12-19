import { hash } from "bcrypt";

export const hashPassword = (plainPassword: string) => {
	return hash(plainPassword, 10);
};
