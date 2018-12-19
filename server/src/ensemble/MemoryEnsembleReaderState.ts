import { EnsembleDto } from "./EnsembleDto";
import { EnsembleObjectDto } from "./EnsembleObjectDto";

export interface MemoryEnsembleReaderState {
	ensembleById: { [ensembleId: string]: EnsembleDto };
	ensembleObjectsByEnsembleId: { [ensembleId: string]: EnsembleObjectDto[] };
}
