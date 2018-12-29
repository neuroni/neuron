import { StorageDriver } from "./StorageDriver";

export class FileData {
	public readonly id: string;
	private storageDriver: StorageDriver;

	constructor(args: { id: string; storageDriver: StorageDriver }) {
		this.id = args.id;
		this.storageDriver = args.storageDriver;
	}

	public getReader() {
		return this.storageDriver.createReadStream(this.id);
	}
}
