import { UserDto } from "./UserDto";
import { UserRepository } from "./UserRepository";

export type CheckUserLogin = (
	args: { userName: string; password: string }
) => Promise<{
	success: boolean;
	user?: UserDto;
}>;

export const createCheckUserLogin = ({
	userRepository
}: {
	userRepository: UserRepository;
}): CheckUserLogin => async args => {
	const user = await userRepository.fetchUserByName(args.userName);

	if (!user) {
		return {
			success: false
		};
	}

	const same = await user.comparePassword(args.password);

	return {
		success: same,
		user: {
			id: user.getId(),
			isAdmin: user.getIsAdmin(),
			name: user.getName(),
			passwordHash: user.getPasswordHash()
		}
	};
};
