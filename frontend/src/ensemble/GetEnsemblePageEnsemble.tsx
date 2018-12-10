import * as React from "react";
import { Query, QueryResult } from "react-apollo";
import { ENSEMBLE_PAGE_ENSEMBLE_QUERY } from "src/servergql/ensemble";
import { getEnsemblePageEnsembleQuery } from "src/types/operation-results-types";

export const GetEnsemblePageEnsemble = (
	args: {
		ensembleId: string;
		children: (props: QueryResult<getEnsemblePageEnsembleQuery>) => React.ReactNode
	}
) => (
    <Query query={ENSEMBLE_PAGE_ENSEMBLE_QUERY} variables={{
		ensembleId: args.ensembleId
	}}>
		{props => args.children(props)}
    </Query>
)