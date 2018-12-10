import { DataStore } from "mockdatastore";
import { EnsembleDto } from "./EnsembleDto";
import { EnsembleReader } from "./EnsembleReader";

export class MemoryEnsembleReader implements EnsembleReader {
	private dataStore: DataStore;

	constructor(args: { dataStore: DataStore }) {
		this.dataStore = args.dataStore;
	}

	async fetchEnsemble(ensembleId: string) {
		const ensemble = this.dataStore.findEntity<EnsembleDto>(
			"ensemble",
			p => p.id === ensembleId
		);

		return ensemble;
	}

	async fetchEnsembleEnsembleObjects(ensembleId: string) {
		return [];
	}

	async fetchEnsemblesByIds(ensembleIds: string[]) {
		const ensembles = await this.dataStore.getFilttered<EnsembleDto>(
			"ensemble",
			p => ensembleIds.some(e => p.id === e)
		);

		if (!ensembles) {
			return [];
		}

		return ensembles;
	}
}
