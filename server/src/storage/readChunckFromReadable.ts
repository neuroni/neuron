import { Readable } from "stream";

export const readChunckFromReadable = (readable: Readable): Promise<Buffer | undefined> => new Promise((resolve, reject) => {
	readable.read();

	let	b: Buffer | string | undefined = undefined;

	readable.once("data", chunck => {
		b = chunck;
	});

	readable.on("close", () => {
		if (!b) {
			resolve(undefined);
		}

		resolve(b as Buffer);
	});

	readable.on("error", (err) => {
		console.log("errer", err);
		reject(err);
	});
});