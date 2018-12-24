import { NoteQueryArgs, UpdateNoteMutationArgs } from "../schemadef";

import { Context } from "../graphql/Context";
import { NoteDto } from "../note/NoteDto";

export const Note = {
	rows: async (root: NoteDto, args, context: Context) => {
		const rows = await context.noteReader.fetchNoteRows(root.id);

		return rows;
	}
};

export const Query = {
	note: (root, args: NoteQueryArgs, context: Context) => {
		if (!context.getCurrentUserId()) {
			return undefined;
		}

		const note = context.noteReader.fetchNoteById(args.noteId);

		return note;
	}
};

export const Mutation = {
	updateNote: async (
		root,
		args: UpdateNoteMutationArgs,
		context: Context
	) => {
		if (!context.getCurrentUserId()) {
			return {
				success: false
			};
		}

		await context.noteService.updateNote({
			noteId: args.noteId,
			name: args.name || undefined,
			updatedNoteRows: args.updatedNoteRows || []
		});

		return {
			success: true
		};
	}
};
