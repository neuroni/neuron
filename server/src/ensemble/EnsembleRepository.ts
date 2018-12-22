import { EnsembleFactory } from "./EnsembleFactory";
import { EnsembleReader } from "./EnsembleReader";

export class EnsembleRepository {
	private ensembleReader: EnsembleReader;
	private ensembleFactory: EnsembleFactory;

	constructor(args: {
		ensembleReader: EnsembleReader;
		ensembleFactory: EnsembleFactory;
	}) {
		this.ensembleReader = args.ensembleReader;
		this.ensembleFactory = args.ensembleFactory;
	}

	async fetchById(ensembleId: string) {
		const ensemble = await this.ensembleReader.fetchEnsemble(ensembleId);

		if (!ensemble) {
			return undefined;
		}

		return this.ensembleFactory.regenerate(ensemble);
	}
}
