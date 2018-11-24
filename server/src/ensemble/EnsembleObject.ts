export abstract class EnsembleObject {
	abstract readonly type: string;
	abstract getId(): string;
	abstract getName(): string;
}
