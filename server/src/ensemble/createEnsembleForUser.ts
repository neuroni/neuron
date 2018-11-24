import { Ensemble } from "./Ensemble";
import { EnsembleDto } from "./EnsembleDto";
import { EnsembleEvents } from "./EnsembleEvents";
import { EnsembleRelationCoordinator } from "./EnsembleRelationCoordinator";
import { EnsembleRepository } from "./EnsembleRepository";
import { IEventStore } from "../eventstore/IEventStore";
import { UidGenerator } from "../common/UidGenerator";
import { User } from "../user/User";
import { UserEnsemblePermissions } from "../user/UserEnsemblePermissions";

export type CreateEnsembleForUser = (
	args: { name: string }
) => Promise<{
	ensemble?: EnsembleDto;
	success: boolean;
}>;

export const createCreateEnsembleForUser = ({
	ensembleRepository,
	userEnsemblePermissions,
	ensembleRelationCoordinator,
	uidGenerator,
	eventStore,
	getCurrentUser
}: {
	ensembleRepository: EnsembleRepository;
	userEnsemblePermissions: UserEnsemblePermissions;
	ensembleRelationCoordinator: EnsembleRelationCoordinator;
	uidGenerator: UidGenerator;
	eventStore: IEventStore;
	getCurrentUser: () => Promise<User | undefined>;
}): CreateEnsembleForUser => async args => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return {
			success: false
		};
	}

	const id = uidGenerator.generateV4Guid();

	const newEnsemble = new Ensemble({
		id: id,
		name: args.name
	});

	eventStore.commit({
		aggregateId: id,
		eventType: EnsembleEvents.ENSEMBLE_CREATED,
		data: {
			name: args.name,
			userId: currentUser.getId()
		}
	});

	await ensembleRepository.save(newEnsemble);

	await ensembleRelationCoordinator.addRootEnsembleForUser({
		ensemble: newEnsemble,
		user: currentUser
	});

	return {
		ensemble: {
			id: newEnsemble.getId(),
			name: newEnsemble.getName()
		},
		success: true
	};
};
