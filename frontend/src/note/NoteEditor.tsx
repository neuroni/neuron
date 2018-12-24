import * as React from "react";

import { EditorState } from "draft-js";
import { GetNoteQuery } from "./GetNoteQuery";
import { NoteEditorTextarea } from "./NoteEditorTextarea";
import { UpdateNoteMutation } from "./UpdateNoteMutation";

export class NoteEditor extends React.Component<{
	noteId: string;
}> {
	public state: {
		editorState: EditorState;
	};

	constructor(props) {
		super(props);
		this.state = { editorState: EditorState.createEmpty() };
	}

	public render() {
		return (
			<GetNoteQuery noteId={this.props.noteId}>
				{props => {
					if (
						props.loading ||
						props.error ||
						!props.data ||
						!props.data.note
					) {
						return <div />;
					}

					const rows = props.data.note.rows;

					return (
						<UpdateNoteMutation>
							{updateNote => (
								<NoteEditorTextarea
									rows={rows}
									delay={500}
									onChange={updatedRows => {
										updateNote({
											variables: {
												noteId: this.props.noteId,
												updatedRows
											}
										});
										// tslint:disable-next-line
										console.log("updatedRows", updatedRows);
									}}
								/>
							)}
						</UpdateNoteMutation>
					);
				}}
			</GetNoteQuery>
		);
	}
}
