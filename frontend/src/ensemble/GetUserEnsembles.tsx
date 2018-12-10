import * as React from "react";

import { Query, QueryResult } from "react-apollo";

import { USER_ENSEMBLES_QUERY } from "src/servergql/ensemble";
import { getUserEnsemblesQuery } from "src/types/operation-results-types";

export const GetUserEnsembles = (args: {
	children: (props: QueryResult<getUserEnsemblesQuery>) => React.ReactNode;
}) => (
	<Query query={USER_ENSEMBLES_QUERY}>
		{(props: QueryResult<getUserEnsemblesQuery>) => args.children(props)}
	</Query>
);
