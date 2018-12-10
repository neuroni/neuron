import { Ensemble } from "./Ensemble";
import { EnsembleRepository } from "./EnsembleRepository";

export type AddEnsembleToEnsemble = (
	args: {
		ensembleToAddId: string;
		ensembleAddToId: string;
	}
) => Promise<{}>;

export const createAddEnsembleToEnsemble = ({
	ensembleRepository
}: {
	ensembleRepository: EnsembleRepository;
}): AddEnsembleToEnsemble => async args => {
	const ensembleToAdd = await ensembleRepository.fetchById(
		args.ensembleAddToId
	);

	const ensembleAddTo = await ensembleRepository.fetchById(
		args.ensembleAddToId
	);

	return {};
};
