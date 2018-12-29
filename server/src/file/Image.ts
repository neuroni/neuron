import { File } from "./File";
import { StorageDriver } from "../storage/StorageDriver";

export class Image extends File {
	private width: number;
	private height: number;

	constructor(args: {
		id: string;
		originalName: string;
		originalSize: number;
		width: number;
		height: number;
		storageDriver: StorageDriver;
	}) {
		super({
			id: args.id,
			originalName: args.originalName,
			originalSize: args.originalSize,
			storageDriver: args.storageDriver
		});

		this.width = args.width;
		this.height = args.height;
	}

	getWidth() {
		return this.width;
	}

	getHeigth() {
		return this.height;
	}
}
