import {
	CreateEnsembleForUserMutationArgs,
	CreateEnsembleForUserResponse,
	CreateEnsembleToEnsembleMutationArgs,
	CreateEnsembleToEnsembleResponse,
	EnsembleQueryArgs
} from "../schemadef";

import { Context } from "../graphql/Context";
import { EnsembleDto } from "../ensemble/EnsembleDto";

export const Ensemble = {
	ensembleObjects: async (root: EnsembleDto, args, context: Context) => {
		const ensembleObjects = await context.ensembleRelationCoordinatorReader.fetchEnsembleEnsembleObjects(
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
		const ensembleIds = await context.ensembleRelationCoordinatorReader.fetchUserRootEnsembleIds(
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
	createEnsembleToEnsemble: async (
		root,
		args: CreateEnsembleToEnsembleMutationArgs,
		context: Context
	) => {
		await context.ensembleService.createEnsemble({
			name: args.name,
			parentEnsembleId: args.parentEnsembleId
		});

		return {
			success: true
		};
	}
};
