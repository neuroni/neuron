import { CurrentFileAggregateSchemaVersion } from "./CurrentFileAggregateSchemaVersion";
import { EventSourcedObject } from "../eventsourcing/EventSourcedObject";
import { FileAggregateName } from "./FileAggregateName";
import { Readable } from "stream";
import { StorageDriver } from "./StorageDriver";
import { createReadStream } from "fs";
import { getFileTypeFromReadable } from "./getFileTypeFromReadable";

export class File extends EventSourcedObject {
	public readonly id: string;
	private storageDriver: StorageDriver;

	private originalName: string;
	private originalSize: number;

	constructor(args: {
		id: string;
		originalName: string;
		originalSize: number;
		storageDriver: StorageDriver;
	}) {
		super({
			aggregateId: args.id,
			aggregateName: FileAggregateName,
			currentAggregateSchemaVersion: CurrentFileAggregateSchemaVersion
		});

		this.id = args.id;
		this.originalName = args.originalName;
		this.originalSize = args.originalSize;

		this.storageDriver = args.storageDriver;
	}

	public async writeBuffer(b: Buffer) {
		return new Promise((resolve, reject) => {
			const writer = this.storageDriver.createWriteStream(this.id);
			writer.write(b, () => {
				resolve();
			});
		});
	}

	public async writeReadable(readableStream: Readable) {
		return new Promise((resolve, reject) => {
			const file = this.storageDriver.createWriteStream(this.id);
			const p = readableStream.pipe(file);

			p.on("finish", () => {
				resolve();
			});

			p.on("error", () => {
				reject();
			});
		});
	}

	public async writeFromPath(filePath: string) {
		return new Promise((resolve, reject) => {
			const readStream = createReadStream(filePath);
			const writeStream = this.storageDriver.createWriteStream(this.id);

			const p = readStream.pipe(writeStream);

			p.on("finish", () => {
				resolve();
			});

			p.on("error", e => {
				reject();
			});
		});
	}

	public getReader() {
		return this.storageDriver.createReadStream(this.id);
	}

	public async getFileType() {
		const reader = this.getReader();
		return getFileTypeFromReadable(reader);
	}
}
