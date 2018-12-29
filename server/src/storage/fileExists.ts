import { exists } from "fs";

export const fileExists = (filePath: string) =>
	new Promise((resolve, reject) => {
		exists(filePath, success => {
			resolve(success);
		});
	});
