import * as React from "react";

import { FetchResult, Mutation, MutationOptions } from "react-apollo";
import {
	createAdminUserMutation,
	createAdminUserMutationVariables
} from "src/types/operation-results-types";

import { CREATE_ADMIN_USER_MUTATION } from "src/servergql/user";

export const CreateAdminUser = (props: {
	children: (
		createAdminUser: (
			args: MutationOptions<
				createAdminUserMutation,
				createAdminUserMutationVariables
			>
		) => Promise<FetchResult<createAdminUserMutation>>
	) => React.ReactNode;
}) => (
	<Mutation mutation={CREATE_ADMIN_USER_MUTATION}>{props.children}</Mutation>
);
