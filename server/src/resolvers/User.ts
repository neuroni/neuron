import { Context } from "../graphql/Context";
import { CreateAdminUserMutationArgs } from "../schemadef";
import { UserDto } from "../user/UserDto";

export const User = {
	id: (root: UserDto, args, context: Context) => {
		return root.id;
	},
	name: (root: UserDto, args, context: Context) => {
		return root.name;
	}
};

export const Mutation = {
	createAdminUser: async (
		root,
		args: CreateAdminUserMutationArgs,
		context: Context
	) => {
		const currentAdminUser = await context.userReader.fetchAdminUser();

		if (currentAdminUser) {
			return {
				success: false,
				viewer: {}
			};
		}

		await context.userService.createAdminUser({
			password: args.password
		});

		return {
			success: true,
			viewer: {}
		};
	}
};
