import * as React from "react";

import { FetchResult, Mutation, MutationOptions } from "react-apollo";
import {
	createEnsembleForUserMutation,
	createEnsembleForUserMutationVariables
} from "src/types/operation-results-types";

import { CREATE_ENSEMBLE_FOR_USER_MUTATION } from "src/servergql/ensemble";

export const CreateEnsembleMutation = (props: {
	children: (
		createEnsembleForUser: (
			args: MutationOptions<
				createEnsembleForUserMutation,
				createEnsembleForUserMutationVariables
			>
		) => Promise<FetchResult<createEnsembleForUserMutation>>
	) => React.ReactNode;
}) => (
	<Mutation mutation={CREATE_ENSEMBLE_FOR_USER_MUTATION}>
		{props.children}
	</Mutation>
);
