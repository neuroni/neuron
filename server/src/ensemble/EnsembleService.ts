export interface EnsembleService {
	createEnsemble(args: { name: string }): Promise<string | undefined>;
	createEnsembleObject(args: {
		ensembleId: string;
		name: string;
		id: string;
		type: string;
	}): Promise<void>;
}
