export interface EnsembleRelationCoordinatorReader {
	fetchUserRootEnsembleIds(userId: string): Promise<string[]>;
	fetchEnsembleEnsembleObjects(
		ensembleId: string
	): Promise<
		{
			id: string;
			name: string;
			type: string;
		}[]
	>;
}
