import { Context } from "../graphql/Context";
import { LoginMutationArgs } from "../schemadef";

export const Query = {
	viewer: () => {
		return {};
	}
};

export const Mutation = {
	login: async (root, args: LoginMutationArgs, context: Context) => {
		const res = await context.checkUserLogin({
			userName: args.userName,
			password: args.password
		});

		if (!res.success) {
			return {
				success: false
			};
		}

		if (res.user) {
			context.setCurrentUserId(res.user.id);
		}

		return {
			success: true
		};
	},
	logout: async (root, args, context: Context) => {}
};

export const Viewer = {
	user: async (root, args, context: Context) => {
		const currentUserId = context.getCurrentUserId();

		if (!currentUserId) {
			return undefined;
		}

		const user = await context.userReader.fetchUserById(currentUserId);

		return user;
	},
	hasSystemAdminUser: async (root, args, context: Context) => {
		const adminUserFound = await context.userReader.hasSystemAdminUser();

		return adminUserFound;
	}
};
