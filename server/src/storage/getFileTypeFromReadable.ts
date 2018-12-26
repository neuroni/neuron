import * as getFileType from "file-type";

import { FileType } from "./FileType";
import { Readable } from "stream";

export const getFileTypeFromReadable = (reader: Readable): Promise<FileType> =>
	new Promise((resolve, reject) => {
		reader.read();

		let b: Buffer | string | undefined = undefined;

		reader.once("data", chunck2 => {
			b = chunck2;
		});

		reader.on("close", () => {
			if (!b) {
				return resolve(undefined);
			}

			const fileType = getFileType(b as Buffer);

			if (!fileType) {
				return resolve(undefined);
			}

			switch (fileType.mime) {
				case "image/png":
					return resolve(FileType.IMAGE_PNG);
				case "image/jpeg":
					return resolve(FileType.IMAGE_JPEG);
			}
		});
	});
