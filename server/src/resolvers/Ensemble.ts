import {
	CreateEnsembleForUserMutationArgs,
	CreateEnsembleForUserResponse,
	CreateEnsembleToEnsembleMutationArgs,
	CreateEnsembleToEnsembleResponse
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
		const res = await context.createEnsembleForUser({
			name: args.name
		});

		return {
			success: res.success,
			ensemble: res.ensemble
		};
	},
	createEnsembleToEnsemble: async (
		root,
		args: CreateEnsembleToEnsembleMutationArgs,
		context: Context
	) => {
		const res = await context.createEnsembleToEnsemble({
			name: args.name,
			parentEnsembleId: args.parentEnsembleId
		});

		return {
			ensemble: res.ensemble,
			success: res.success
		};
	}
};
