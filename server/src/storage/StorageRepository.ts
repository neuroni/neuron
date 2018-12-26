import { File } from "./File";
import { StorageDriver } from "./StorageDriver";
import { v4 } from "uuid";

export class StorageRepository {
	private storageDriver: StorageDriver;

	constructor(args: { storageDriver: StorageDriver }) {
		this.storageDriver = args.storageDriver;
	}

	async create() {
		const id = v4();

		return new File({
			id: id,
			storageDriver: this.storageDriver
		});
	}

	async fetch(id: string) {
		return new File({
			id: id,
			storageDriver: this.storageDriver
		});
	}
}
