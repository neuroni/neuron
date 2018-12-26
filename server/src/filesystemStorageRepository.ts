import { FilesystemStorageDriver, StorageRepository } from "./storage";

import { ensureDirSync } from "fs-extra";

ensureDirSync("files");

const filesystemStorageDriver = new FilesystemStorageDriver({
	directoryPath: "files"
});

const fileRepository = new StorageRepository({
	storageDriver: filesystemStorageDriver
});

export const filesystemStorageRepository = fileRepository;
