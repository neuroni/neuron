import { Request, Response } from "express";

import { EnsembleService } from "../ensemble/EnsembleService";
import { FileDataRepository } from "../storage/FileDataRepository";
import { FileService } from "../file/FileService";

export interface UploadEnsembleObjectRequest extends Request {
	fileDataRepository: FileDataRepository;
	fileService: FileService;
	ensembleService: EnsembleService;
	body: {
		ensembleId: string;
	};
}

export interface UploadEnsembleObjectResponse extends Response {}

export const uploadEnsembleObject = async (
	req: UploadEnsembleObjectRequest,
	res: UploadEnsembleObjectResponse
) => {
	const reqFile = req.file;
	const filePath = reqFile.path;
	const fileData = await req.fileDataRepository.createFromPath(filePath);

	if (!fileData) {
		return res.end();
	}

	const fileId = await req.fileService.createFile({
		fileDataId: fileData.id,
		originalName: reqFile.originalname,
		originalSize: reqFile.size,
		mimeType: reqFile.mimetype
	});

	await req.ensembleService.createEnsembleObject({
		ensembleId: req.body.ensembleId,
		id: fileId,
		name: reqFile.originalname,
		type: "File"
	});

	res.status(200);
	res.end();
};
