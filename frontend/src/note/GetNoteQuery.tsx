import * as React from "react";

import { Query, QueryResult } from "react-apollo";

import { NOTE_QUERY } from "src/servergql/note";
import { getNoteQuery } from "src/types/operation-results-types";

export const GetNoteQuery = (args: {
	noteId: string;
	children: (props: QueryResult<getNoteQuery>) => React.ReactNode;
}) => (
	<Query
		query={NOTE_QUERY}
		variables={{
			noteId: args.noteId
		}}
	>
		{(props: QueryResult<getNoteQuery>) => args.children(props)}
	</Query>
);
