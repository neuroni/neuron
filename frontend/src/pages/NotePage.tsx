import * as React from "react";

import { Grid } from "react-bootstrap";
import { NoteEditor } from "src/note/NoteEditor";
import { match } from "react-router";

interface InputProps {
	match: match<{
		noteId: string;
	}>;
}

export const NotePage = (args: InputProps) => (
	<Grid>
		<NoteEditor noteId={args.match.params.noteId} />
	</Grid>
);
