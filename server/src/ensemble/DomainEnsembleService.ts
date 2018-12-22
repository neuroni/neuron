import { EnsembleFactory } from "./EnsembleFactory";
import { EnsembleRepository } from "./EnsembleRepository";
import { EnsembleService } from "./EnsembleService";
import { EventSourcedObjectRepository } from "../eventsourcing/EventSourcedObjectRepository";

export class DomainEnsembleService implements EnsembleService {
	ensembleFactory: EnsembleFactory;
	ensembleRepository: EnsembleRepository;
	eventSoucedObjectRepository: EventSourcedObjectRepository;

	constructor(args: {
		ensembleFactory: EnsembleFactory;
		ensembleRepository: EnsembleRepository;
		eventSourcedObjectRepository: EventSourcedObjectRepository;
	}) {
		this.ensembleFactory = args.ensembleFactory;
		this.ensembleRepository = args.ensembleRepository;
		this.eventSoucedObjectRepository = args.eventSourcedObjectRepository;
	}

	async createEnsemble(args: { name: string; parentEnsembleId?: string }) {
		const ensemble = this.ensembleFactory.createNew({
			name: args.name
		});

		this.eventSoucedObjectRepository.save(ensemble);

		await this.eventSoucedObjectRepository.commit();

		return ensemble.getId();
	}

	async createEnsembleObject(args: {
		ensembleId: string;
		name: string;
		id: string;
		type: string;
	}) {
		const ensemble = await this.ensembleRepository.fetchById(
			args.ensembleId
		);

		if (!ensemble) {
			return undefined;
		}

		ensemble.createEnsembleObject({
			id: args.id,
			name: args.name,
			type: args.type
		});

		this.eventSoucedObjectRepository.save(ensemble);

		await this.eventSoucedObjectRepository.commit();
	}
}
