import { Ensemble } from "./Ensemble";
import { UidGenerator } from "../common/UidGenerator";
import { EnsembleEvents } from "./EnsembleEvents";
import { EnsembleAggregateName } from "./EnsembleAggregateName";
import { CurrentEnsembleAggregateVersion } from "./CurrentEnsembleAggregateVersion";

export class EnsembleFactory {
	private uidgenerator: UidGenerator;

	createNew(args: { name: string }) {
		const id = this.uidgenerator.generateV4Guid();

		const newEnsemble = new Ensemble({
			id: id,
			name: args.name,
			events: [
				{
					aggregateId: id,
					aggregateName: EnsembleAggregateName,
					aggregateVersion: CurrentEnsembleAggregateVersion,
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
