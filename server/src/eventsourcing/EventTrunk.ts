export interface EventTrunk {
	eventName: string;
	aggregateId: string;
	aggregateName: string;
	aggregateVersion: number;
	data: any;
}
