import { EnsembleObject } from "./EnsembleObject";

export class Ensemble extends EnsembleObject {
	private id: string;
	private name: string;

	constructor(args: { id: string; name: string }) {
		super();
		this.id = args.id;
		this.name = args.name;
	}

	get type() {
		return "Ensemble";
	}

	public getId() {
		return this.id;
	}

	public getName() {
		return this.name;
	}
}
