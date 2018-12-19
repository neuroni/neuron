export interface EnsembleService {
	createEnsemble(args: {
		name: string;
		parentEnsembleId?: string;
	}): Promise<string | undefined>;
}
