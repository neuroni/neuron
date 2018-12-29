import { Readable, Writable } from "stream";

export const pipeStream = (readStream: Readable, writeStream: Writable) =>
	new Promise((resolve, reject) => {
		const p = readStream.pipe(writeStream);

		p.on("finish", () => {
			resolve();
		});

		p.on("error", () => {
			reject();
		});
	});
