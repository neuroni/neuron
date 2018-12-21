import { appendFile, createReadStream } from "fs-extra";

import { EventStorage } from "./EventStorage";
import { ObjectParser } from "../common/ObjectParser";
import { SavedEvent } from "./SavedEvent";
import { resolve } from "dns";

export class EventStorageFile implements EventStorage {
	private path: string;

	constructor(args: { path: string }) {
		this.path = args.path;
	}

	public read() {
		const queue: SavedEvent[] = [];
		let finished = false;

		let nextResolve;
		let nextPromiseResolved = false;

		let nextPromise = new Promise<IteratorResult<SavedEvent>>(
			(resolve, reject) => {
				nextResolve = resolve;
			}
		);

		const readStream = createReadStream(this.path, {
			encoding: "utf8"
		});

		const objectParser = new ObjectParser(obj => {
			if (nextPromiseResolved) {
				queue.push(obj);
			}

			nextResolve(obj);
			nextPromiseResolved = true;
		});

		readStream.on("data", b => objectParser.pushChunck(b));
		readStream.on("end", () => (finished = true));

		return {
			[Symbol.asyncIterator]() {
				return {
					next: () => {
						const currentPromise = nextPromise;

						nextPromise = new Promise((resolve, reject) => {
							nextResolve = resolve;
						});

						const nextEvent = queue.pop();

						if (nextEvent) {
							nextResolve({
								value: nextEvent
							});
							nextPromiseResolved = true;
						}

						if (!nextEvent) {
							if (finished) {
								nextResolve({
									value: undefined
								});
								return currentPromise;
							}
							nextPromiseResolved = false;
						}

						return currentPromise;
					}
				};
			}
		};
	}

	async addEvent(event: SavedEvent | SavedEvent[]) {
		if (event instanceof Array) {
			const d = event.reduce((p, c) => (p += JSON.stringify(c)), "");

			return appendFile(this.path, d, {
				encoding: "utf8"
			});
		}

		return appendFile(this.path, JSON.stringify(event), {
			encoding: "utf8"
		});
	}
}
