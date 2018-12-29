import { FileService } from "./FileService";
import { createGuid } from "../common/createGuid";

export class DomainFileService implements FileService {
	async createFile(args: {
		fileDataId: string;
		originalName: string;
		originalSize: number;
		mimeType: string;
	}) {
		return createGuid();
	}
}
