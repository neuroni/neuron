import * as React from "react";

import { FetchResult, Mutation, MutationOptions } from "react-apollo";
import {
	updateNoteMutation,
	updateNoteMutationVariables
} from "src/types/operation-results-types";

import { UPDATE_NOTE_MUTATION } from "src/servergql/note";

export const UpdateNoteMutation = (props: {
	children: (
		updateNote: (
			args: MutationOptions<
				updateNoteMutation,
				updateNoteMutationVariables
			>
		) => Promise<FetchResult<updateNoteMutation>>
	) => React.ReactNode;
}) => <Mutation mutation={UPDATE_NOTE_MUTATION}>{props.children}</Mutation>;
