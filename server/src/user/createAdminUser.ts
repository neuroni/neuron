// import { UidGenerator } from "../common/UidGenerator";
// import { User } from "./User";
// import { UserRepository } from "./UserRepository";

// export type CreateAdminUser = (
// 	args: {
// 		password: string;
// 	}
// ) => Promise<{
// 	user?: User;
// 	success: boolean;
// }>;

// export const createCreateAdminUser = ({
// 	userRepository,
// 	uidGenerator
// }: {
// 	userRepository: UserRepository;
// 	uidGenerator: UidGenerator;
// }): CreateAdminUser => async (args: { password: string }) => {
// 	const currentAdminUser = await userRepository.fetchAdmin();

// 	if (currentAdminUser) {
// 		return {
// 			success: false
// 		};
// 	}

// 	const id = uidGenerator.generateV4Guid();

// 	const adminUser = new User({
// 		id: id,
// 		name: "admin",
// 		isAdmin: true
// 	});

// 	const adminUser = await adminUser.changePassword(args.password);

// 	await userRepository.save(adminUser);

// 	return {
// 		success: true,
// 		user: adminUser
// 	};
// };
