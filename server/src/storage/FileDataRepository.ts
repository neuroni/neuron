import { createReadStream, exists, read, write } from "fs-extra";

import { FileData } from "./FileData";
import { Readable } from "stream";
import { StorageDriver } from "./StorageDriver";
import { createGuid } from "../common/createGuid";
import { createHash } from "crypto";
import { fileExists } from "./fileExists";
import { getFileHash } from "./getFileHash";
import { pipeStream } from "./pipeStream";

export class FileDataRepository {
	private storageDriver: StorageDriver;

	constructor(args: { storageDriver: StorageDriver }) {
		this.storageDriver = args.storageDriver;
	}

	public async createNewFromReadable(readableStream: Readable) {
		const id = await getFileHash(readableStream);

		const writeStream = this.storageDriver.createWriteStream(id);

		await pipeStream(readableStream, writeStream);

		return new FileData({
			id: id,
			storageDriver: this.storageDriver
		});
	}

	public async createFromPath(filePath: string) {
		const fileFound = await fileExists(filePath);

		if (!fileFound) {
			return undefined;
		}

		const readStream = createReadStream(filePath);

		return this.createNewFromReadable(readStream);
	}

	public createForId(id: string) {
		return new FileData({
			id: id,
			storageDriver: this.storageDriver
		});
	}
}
