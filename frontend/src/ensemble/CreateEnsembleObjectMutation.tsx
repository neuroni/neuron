import * as React from "react";

import { FetchResult, Mutation, MutationOptions } from "react-apollo";
import {
	createEnsembleObjectMutation,
	createEnsembleObjectMutationVariables
} from "src/types/operation-results-types";

import { CREATE_ENSEMBLE_OBJECT_MUTATION } from "src/servergql/ensemble";

export const CreateEnsembleObjectMutation = (props: {
	children: (
		createEnsembleObject: (
			args: MutationOptions<
				createEnsembleObjectMutation,
				createEnsembleObjectMutationVariables
			>
		) => Promise<FetchResult<createEnsembleObjectMutation>>
	) => React.ReactNode;
}) => (
	<Mutation mutation={CREATE_ENSEMBLE_OBJECT_MUTATION}>
		{props.children}
	</Mutation>
);
