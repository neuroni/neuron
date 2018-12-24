import gql from "graphql-tag";

export const UPDATE_NOTE_MUTATION = gql`
	mutation updateNote(
		$noteId: ID!
		$name: String
		$updatedRows: [UpdatedNoteRow]
	) {
		updateNote(
			noteId: $noteId
			name: $name
			updatedNoteRows: $updatedRows
		) {
			success
		}
	}
`;

export const NOTE_QUERY = gql`
	query getNote($noteId: ID!) {
		note(noteId: $noteId) {
			id
			name
			rows {
				rowNumber
				text
			}
		}
	}
`;
