import { Readable, Writable } from "stream";

export interface StorageDriver {
	createWriteStream(id: string): Writable;
	createReadStream(id: string): Readable;
	getFileUrl(fileId: string): Promise<string>;
}
