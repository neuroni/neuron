import {
	CreateEnsembleForUserMutationArgs,
	CreateEnsembleObjectMutationArgs,
	EnsembleQueryArgs
} from "../schemadef";

import { Context } from "../graphql/Context";
import { EnsembleDto } from "../ensemble/EnsembleDto";

export const Ensemble = {
	ensembleObjects: async (root: EnsembleDto, args, context: Context) => {
		const ensembleObjects = await context.ensembleReader.fetchEnsembleEnsembleObjects(
			root.id
		);

		return ensembleObjects;
	}
};

export const EnsembleObject = {
	__resolveType: (obj, context, info) => {
		return obj.type;
	}
};

export const Query = {
	ensemble: async (root, args: EnsembleQueryArgs, context: Context) => {
		const ensemble = await context.ensembleReader.fetchEnsemble(
			args.ensembleId
		);

		return ensemble;
	},
	userEnsembles: async (root, args, context: Context) => {
		const ensembleIds = await context.userReader.fetchUserEnsembleIds(
			context.getCurrentUserId()
		);

		const ensembles = await context.ensembleReader.fetchEnsemblesByIds(
			ensembleIds
		);

		return {
			ensembles
		};
	}
};

export const Mutation = {
	createEnsembleForUser: async (
		root,
		args: CreateEnsembleForUserMutationArgs,
		context: Context
	) => {
		if (!context.getCurrentUserId()) {
			return {
				success: false
			};
		}

		const ensembleId = await context.ensembleService.createEnsemble({
			name: args.name
		});

		if (!ensembleId) {
			return {
				success: false
			};
		}

		await context.userService.addEnsembleForUser({
			ensembleId: ensembleId,
			userId: context.getCurrentUserId()
		});

		return {
			success: true,
			ensemble: undefined
		};
	},
	createEnsembleObject: async (
		root,
		args: CreateEnsembleObjectMutationArgs,
		context: Context
	) => {
		let id: undefined | string = undefined;

		switch (args.type) {
			case "Ensemble":
				id = await context.ensembleService.createEnsemble({
					name: args.name
				});
				break;
			case "Note":
				id = await context.noteService.createNote({
					name: args.name
				});
				break;
		}

		if (!id) {
			return {
				success: false
			};
		}

		await context.ensembleService.createEnsembleObject({
			id: id,
			name: args.name,
			type: args.type,
			ensembleId: args.parentEnsembleId
		});

		return {
			success: true
		};
	}
};
