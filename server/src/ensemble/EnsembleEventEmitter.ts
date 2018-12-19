
export class EnsembleEventEmitter {
    publishEnsembleCreatedEvent(args: {
        aggregateId: string;
        data: {
            name: string;
            userId: string;
            parentEsembleId?: string;
        }
    }) {

    }
}