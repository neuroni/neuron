import { v4 } from "uuid";

export class UidGenerator {
	generateV4Guid() {
		const id = v4();

		return id;
	}
}
