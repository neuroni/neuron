import { Ensemble } from "./Ensemble";

export interface EnsembleRepository {
	fetchById(ensembleId: string): Promise<Ensemble | undefined>;
	remove(ensemble: Ensemble): Promise<void>;
	save(ensemble: Ensemble): Promise<void>;
}
