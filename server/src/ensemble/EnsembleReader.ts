import { EnsembleDto } from "./EnsembleDto";
import { EnsembleObjectDto } from "./EnsembleObjectDto";

export interface EnsembleReader {
	fetchEnsemble(ensembleId: string): Promise<EnsembleDto | undefined>;
	fetchEnsemblesByIds(ensembleIds: string[]): Promise<EnsembleDto[]>;
	fetchEnsembleEnsembleObjects(
		ensembleId: string
	): Promise<EnsembleObjectDto[]>;
}
