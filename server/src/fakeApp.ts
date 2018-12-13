import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as session from "express-session";

import { pathExists } from "fs-extra";

import { graphiqlExpress, graphqlExpress } from "apollo-server-express";

import { Context } from "./graphql/Context";

import { createFakeServices } from "./createFakeServices";
import { schema } from "./schema";
import { EventStore } from "./eventstore/EventStore";
import { DataStore } from "mockdatastore";

export const main = async () => {
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

	const dataStore = new DataStore({});

	if (await pathExists("database.json")) {
		await dataStore.load("database.json");
	}

	app.use("/graphql", async (req, res, next) => {
		const services = await createFakeServices({
			dataStore: dataStore,
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
