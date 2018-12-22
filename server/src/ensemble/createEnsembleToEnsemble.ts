// import { Ensemble } from "./Ensemble";
// import { EnsembleEvents } from "./EnsembleEvents";
// import { EnsembleRelationCoordinator } from "./EnsembleRelationCoordinator";
// import { EnsembleRepository } from "./EnsembleRepository";
// import { IEventStore } from "../eventstore/IEventStore";
// import { UidGenerator } from "../common/UidGenerator";
// import { User } from "../user/User";

// export type CreateEnsembleToEnsemble = (
// 	args: { name: string; parentEnsembleId: string }
// ) => Promise<{
// 	success: boolean;
// 	ensemble?: Ensemble;
// }>;

// export const createCreateEnsembleToEnsemble = (dep: {
// 	eventStore: IEventStore;
// 	ensembleRepository: EnsembleRepository;
// 	ensembleRelationCoordinator: EnsembleRelationCoordinator;
// 	uidGenerator: UidGenerator;
// 	getCurrentUser: () => Promise<User | undefined>;
// }) => async args => {
// 	const parentEnsemble = await dep.ensembleRepository.fetchById(
// 		args.parentEnsembleId
// 	);

// 	if (!parentEnsemble) {
// 		return {
// 			success: false
// 		};
// 	}

// 	const user = await dep.getCurrentUser();

// 	if (!user) {
// 		return {
// 			success: false
// 		};
// 	}

// 	if (!user.getIsAdmin()) {
// 		return {
// 			success: false
// 		};
// 	}

// 	const id = dep.uidGenerator.generateV4Guid();

// 	const newEnsemble = new Ensemble({
// 		id: id,
// 		name: args.name
// 	});

// 	await dep.ensembleRepository.save(newEnsemble);

// 	dep.ensembleRelationCoordinator.addEnsembleObjectToEnsemble({
// 		ensembleObject: newEnsemble,
// 		ensemble: parentEnsemble
// 	});

// 	dep.eventStore.commit({
// 		aggregateId: id,
// 		eventType: EnsembleEvents.ENSEMBLE_CREATED,
// 		data: {
// 			name: args.name,
// 			parentId: args.parentEnsembleId
// 		}
// 	});

// 	return {
// 		success: true
// 	};
// };
