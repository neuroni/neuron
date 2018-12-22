import { CurrentEnsembleAggregateVersion } from "./CurrentEnsembleAggregateVersion";
import { Ensemble } from "./Ensemble";
import { EnsembleAggregateName } from "./EnsembleAggregateName";
import { EnsembleEvents } from "./EnsembleEvents";
import { UidGenerator } from "../common/UidGenerator";

export class EnsembleFactory {
	private uidgenerator: UidGenerator;

	constructor(args: { uidgenerator: UidGenerator }) {
		this.uidgenerator = args.uidgenerator;
	}

	createNew(args: { name: string }) {
		const id = this.uidgenerator.generateV4Guid();

		const newEnsemble = new Ensemble({
			id: id,
			name: args.name,
			events: [
				{
					aggregateId: id,
					aggregateName: EnsembleAggregateName,
					currentAggregateSchemaVersion: CurrentEnsembleAggregateVersion,
					eventName: EnsembleEvents.ENSEMBLE_CREATED,
					data: {
						name: args.name
					}
				}
			]
		});

		return newEnsemble;
	}

	regenerate(args: { id: string; name: string }) {
		return new Ensemble({
			id: args.id,
			name: args.name
		});
	}
}
