import { createFakeServices } from "./createFakeServices";

export interface RequestServices {}

export const fakeServicesMiddleware = (req, res, next) => {
	const services = createFakeServices({
		currentUserId: req.currentUserId
	});
};
