import { DataStore } from "mockdatastore";
import { Ensemble } from "./Ensemble";
import { EnsembleRepository } from "./EnsembleRepository";

type EnsembleType = {
	id: string;
	name: string;
};

export class MemoryEnsembleRepository implements EnsembleRepository {
	private dataStore: DataStore;

	constructor(args: { dataStore: DataStore }) {
		this.dataStore = args.dataStore;
	}

	async fetchById(ensembleId: string) {
		const ensembleDto = this.dataStore.findEntity<EnsembleType>(
			"ensemble",
			p => p.id === ensembleId
		);

		if (!ensembleDto) {
			return undefined;
		}

		return new Ensemble(ensembleDto);
	}

	async remove(ensemble: Ensemble) {
		this.dataStore.filter<EnsembleType>(
			"ensemble",
			p => p.id === ensemble.getId()
		);
		await this.dataStore.save("database.json");
	}

	async save(ensemble: Ensemble) {
		let ensembleDto = this.dataStore.findEntity<EnsembleType>(
			"ensemble",
			p => p.id === ensemble.getId()
		);

		if (!ensembleDto) {
			ensembleDto = {
				id: ensemble.getId(),
				name: ensemble.getName()
			};
			this.dataStore.pushBack<EnsembleType>("ensemble", ensembleDto);
			await this.dataStore.save("database.json");
			return;
		}

		ensembleDto.id = ensemble.getId();
		ensembleDto.name = ensemble.getName();

		await this.dataStore.save("database.json");
	}
}
