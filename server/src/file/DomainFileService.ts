import { FileService } from "./FileService";
import { createGuid } from "../common/createGuid";
import { Image } from "./Image";

export class DomainFileService implements FileService {
	async createFile(args: {
		fileDataId: string;
		originalName: string;
		originalSize: number;
		mimeType: string;
	}) {
		const newId = createGuid();

		if (args.mimeType === "image/jpeg" || args.mimeType === "image/png") {
			const newImage = new Image({
				id: newId,
				originalName: args.originalName,
				originalSize: args.originalSize,
				 
			})
		}

		return createGuid();
	}
}
