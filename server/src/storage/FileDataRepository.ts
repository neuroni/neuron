import { createReadStream, exists, read, write } from "fs-extra";

import { FileData } from "./FileData";
import { StorageDriver } from "./StorageDriver";
import { fileExists } from "./fileExists";
import { getFileHash } from "./getFileHash";
import { pipeStream } from "./pipeStream";

export class FileDataRepository {
	private storageDriver: StorageDriver;

	constructor(args: { storageDriver: StorageDriver }) {
		this.storageDriver = args.storageDriver;
	}

	public async createFromPath(filePath: string) {
		const fileFound = await fileExists(filePath);

		if (!fileFound) {
			return undefined;
		}

		let readableStream = createReadStream(filePath);

		const id = await getFileHash(readableStream);

		const writeStream = this.storageDriver.createWriteStream(id);

		readableStream = createReadStream(filePath);

		await pipeStream(readableStream, writeStream);

		return new FileData({
			id: id,
			storageDriver: this.storageDriver
		});
	}

	public createForId(id: string) {
		return new FileData({
			id: id,
			storageDriver: this.storageDriver
		});
	}
}
