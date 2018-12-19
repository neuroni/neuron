import { EnsembleFactory } from "./EnsembleFactory";
import { EventSourcedObjectRepository } from "../eventsourcing/EventSourcedObjectRepository";
import { EnsembleRepository } from "./EnsembleRepository";
import { EnsembleService } from "./EnsembleService";

export class DomainEnsembleService implements EnsembleService {
	ensembleFactory: EnsembleFactory;
	ensembleRepository: EnsembleRepository;
	eventSoucedObjectRepository: EventSourcedObjectRepository;

	async createEnsemble(args: { name: string; parentEnsembleId?: string }) {
		const ensemble = this.ensembleFactory.createNew({
			name: args.name
		});

		if (args.parentEnsembleId) {
			const parentEnsemble = await this.ensembleRepository.fetchById(
				args.parentEnsembleId
			);

			if (!parentEnsemble) {
				return undefined;
			}

			parentEnsemble.createEnsembleObject({
				name: parentEnsemble.getName(),
				type: "Ensemble"
			});

			this.eventSoucedObjectRepository.save(parentEnsemble);
		}

		this.eventSoucedObjectRepository.save(ensemble);

		await this.eventSoucedObjectRepository.commit();

		return ensemble.getId();
	}
}
