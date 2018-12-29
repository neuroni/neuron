import { FileDto } from "./FileDto";

export interface FileReader {
	fetchFile(fileId: string): Promise<FileDto>;
}
