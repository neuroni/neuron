import { Request, Response } from "express";

import { StorageRepository } from "../storage";
import { filesystemStorageRepository } from "../filesystemStorageRepository";

export interface UploadEnsembleObjectRequest extends Request {
	storageRepository: StorageRepository;
}

export interface UploadEnsembleObjectResponse extends Response {}

export const uploadEnsembleObject = async (
	req: UploadEnsembleObjectRequest,
	res: UploadEnsembleObjectResponse
) => {
	const filePath = req.file.path;

	const file = await req.storageRepository.create();
	await file.writeFromPath(filePath);
};
