import * as React from "react";

import { FetchResult, Mutation, MutationOptions } from "react-apollo";
import {
	loginMutation,
	loginMutationVariables
} from "src/types/operation-results-types";

import { LOGIN_USER_MUTATION } from "src/servergql/user";

export const LoginUser = (props: {
	children: (
		loginUser: (
			args: MutationOptions<loginMutation, loginMutationVariables>
		) => Promise<FetchResult<loginMutation>>
	) => React.ReactNode;
}) => <Mutation mutation={LOGIN_USER_MUTATION}>{props.children}</Mutation>;
