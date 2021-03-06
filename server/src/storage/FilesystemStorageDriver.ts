import { createReadStream, createWriteStream, ensureDirSync } from "fs-extra";

import { StorageDriver } from "./StorageDriver";
import { join } from "path";

export class FilesystemStorageDriver implements StorageDriver {
	private directoryPath: string;

	constructor(args: { directoryPath: string }) {
		this.directoryPath = args.directoryPath;

		ensureDirSync(this.directoryPath);
	}

	createWriteStream(id: string) {
		const writer = createWriteStream(join(this.directoryPath, id));
		return writer;
	}

	createReadStream(id: string) {
		console.log("id", id, this.directoryPath);
		const path = join(this.directoryPath, id);

		console.log("createReadStream path", path);

		const reader = createReadStream(path);
		return reader;
	}

	async getFileUrl(fileId: string) {
		return "http://localhost:4657/file/" + fileId;
	}
}
