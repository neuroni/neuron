import { EnsembleRepository } from "./EnsembleRepository";
import { User } from "../user/User";
import { UserEnsemblePermissions } from "../user/UserEnsemblePermissions";

export type RemoveEnsemble = (
	args: {
		ensembleId;
	}
) => Promise<{
	success: boolean;
}>;

export const createRemoveEnsemble = ({
	userEnsemblePermissions,
	ensembleRepository,
	currentUser
}: {
	userEnsemblePermissions: UserEnsemblePermissions;
	ensembleRepository: EnsembleRepository;
	currentUser: User;
}): RemoveEnsemble => async args => {
	const ensemble = await ensembleRepository.fetchById(args.ensembleId);

	if (!ensemble) {
		return {
			success: false
		};
	}

	if (
		!(await userEnsemblePermissions.hasUserRemoveEnsemblePermission({
			user: currentUser,
			ensemble: ensemble
		}))
	) {
		return {
			success: false
		};
	}

	await ensembleRepository.remove(ensemble);

	return {
		success: true
	};
};
