import { appendFile, createReadStream, exists } from "fs-extra";

import { EventStorage } from "./EventStorage";
import { ObjectParser } from "../common/ObjectParser";
import { SavedEvent } from "./SavedEvent";

export class EventStorageFile implements EventStorage {
	private path: string;

	constructor(args: { path: string }) {
		this.path = args.path;
	}

	public async read(onNewEvent: (newEvent: SavedEvent) => void) {
		exists(this.path, found => {
			if (!found) {
				return;
			}

			const readStream = createReadStream(this.path, {
				encoding: "utf8"
			});

			const objectParser = new ObjectParser(obj => {
				onNewEvent(obj);
			});

			readStream.on("data", b => objectParser.pushChunck(b));
			// readStream.on("end", () => (finished = true));
		});
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
