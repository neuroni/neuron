import * as React from "react";

import { Query, QueryResult } from "react-apollo";

import { PAGE_VIEWER_QUERY } from "src/servergql/viewer";
import { getPageViewerQuery } from "src/types/operation-results-types";

export const GetPageViewer = (args: {
	children: (props: QueryResult<getPageViewerQuery>) => React.ReactNode;
}) => (
	<Query query={PAGE_VIEWER_QUERY}>
		{(props: QueryResult<getPageViewerQuery>) => {
			return args.children(props);
		}}
	</Query>
);
