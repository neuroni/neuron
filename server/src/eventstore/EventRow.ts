export type EventRow = {
	eventType: string;
	aggregateId: string;
	data: any;
	version: number;
	eventTime: Date;
};
