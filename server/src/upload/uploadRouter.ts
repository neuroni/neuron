import * as multer from "multer";

import { Router } from "express";
import { filesystemStorageRepository } from "../filesystemStorageRepository";

export const uploadRouter = Router();

const upload = multer({
	dest: "uploads/"
});

uploadRouter.post(
	"/ensemble_object",
	upload.single("file"),
	async (req, res) => {
		const filePath = req.file.path;

		const file = await filesystemStorageRepository.create();
		try {
			await file.writeFromPath(filePath);
		} catch (e) {
			console.log("e", e);
		}
		res.end(file.id);
	}
);
