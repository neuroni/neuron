import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as session from "express-session";

import { graphiqlExpress, graphqlExpress } from "apollo-server-express";

import { Context } from "./graphql/Context";
import { User } from "./user/User";
import { createFakeServices } from "./createFakeServices";
import { schema } from "./schema";

export const main = () => {
	const app = express();

	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(
		bodyParser.json({
			limit: "5mb"
		})
	);

	app.use(
		cors({
			origin: true,
			credentials: true
		})
	);

	app.use(
		session({
			secret: "keyboard cat",
			resave: false,
			saveUninitialized: true,
			cookie: { secure: false }
		})
	);

	app.use("/graphql", async (req, res, next) => {
		const services = await createFakeServices({
			currentUserId: req.session && req.session.currentUserId
		});

		graphqlExpress({
			schema,
			context: new Context({
				session: req.session,
				createAdminUser: services.createAdminUser,
				userReader: services.userReader,
				checkUserLogin: services.checkUserLogin,
				createEnsembleForUser: services.createEnsembleForUser,
				createEnsembleToEnsemble: services.createEnsembleToEnsemble,
				ensembleReader: services.ensembleReader,
				ensembleRelationCoordinatorReader:
					services.ensembleRelationCoordinatorReader
			})
		})(req, res, next);
	});

	app.use(
		"/graphiql",
		graphiqlExpress({
			endpointURL: "/graphql"
		})
	);

	app.get("/*", (req, res) => {
		res.end("kikkukiusaus");
	});

	app.listen(8897, () => {
		console.log("Listening port " + 8897);
	});
};

main();
