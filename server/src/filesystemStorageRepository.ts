import { FilesystemStorageDriver } from "./storage/FilesystemStorageDriver";
import { StorageRepository } from "./storage/StorageRepository";
import { ensureDirSync } from "fs-extra";

ensureDirSync("files");

const filesystemStorageDriver = new FilesystemStorageDriver({
	directoryPath: "files"
});

const fileRepository = new StorageRepository({
	storageDriver: filesystemStorageDriver
});

export const filesystemStorageRepository = fileRepository;
