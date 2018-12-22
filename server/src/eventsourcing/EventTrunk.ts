export interface EventTrunk {
	eventName: string;
	aggregateId: string;
	aggregateName: string;
	currentAggregateSchemaVersion: number;
	data: any;
}
