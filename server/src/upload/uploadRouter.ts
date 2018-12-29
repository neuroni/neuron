import * as multer from "multer";

import { Router } from "express";
import { filesystemStorageRepository } from "../filesystemStorageRepository";
import { uploadEnsembleObject } from "./uploadEnsembleObject";

export const uploadRouter = Router();

const upload = multer({
	dest: "uploads/"
});

uploadRouter.post("/", upload.single("file"), uploadEnsembleObject);
