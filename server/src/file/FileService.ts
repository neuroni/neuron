export interface FileService {
	createFile(args: {
		fileDataId: string;
		originalName: string;
		originalSize: number;
		mimeType: string;
	}): Promise<string>;
}
