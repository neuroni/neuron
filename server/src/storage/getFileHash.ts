import { Readable } from "stream";
import { createHash } from "crypto";

export const getFileHash = (readableStream: Readable): Promise<string> =>
	new Promise((resolve, reject) => {
		readableStream.read();

		const shasum = createHash("sha256");

		readableStream.on("data", chunk => {
			shasum.update(chunk);
		});

		readableStream.on("end", () => {
			const hash = shasum.digest("hex");

			resolve(hash);
		});

		readableStream.on("error", e => {
			reject();
		});
	});
