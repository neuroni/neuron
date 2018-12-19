import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as session from "express-session";

import { graphiqlExpress, graphqlExpress } from "apollo-server-express";

import { Context } from "./graphql/Context";

import { schema } from "./schema";
import { EventStorageFile } from "./eventsourcing/EventStorageFile";
import { MockEventStore } from "./eventsourcing/MockEventStore";
import { MemoryUserReader } from "./user/MemoryUserReader";
import { MemoryEnsembleReader } from "./ensemble/MemoryEnsembleReader";
import { DomainUserService } from "./user/DomainUserService";
import { DomainEnsembleService } from "./ensemble/DomainEnsembleService";
import { UserRepository } from "./user/UserRepository";
import { UserFactory } from "./user/UserFactory";
import { UidGenerator } from "./common/UidGenerator";
import { EventSourcedObjectRepository } from "./eventsourcing/EventSourcedObjectRepository";

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

const uidGenerator = new UidGenerator();

const userFactory = new UserFactory({
	uidGenerator: uidGenerator
});

const eventStorageFile = new EventStorageFile({
	path: "storedevents.json"
});

const eventStore = new MockEventStore({
	eventStorage: eventStorageFile
});

const eventSourcedObjectRepository = new EventSourcedObjectRepository({
	eventStore: eventStore
});

const userReader = new MemoryUserReader({
	eventStore: eventStore
});

const ensembleReader = new MemoryEnsembleReader({
	eventStore: eventStore
});

const userRepository = new UserRepository({
	userFactory: userFactory,
	userReader: userReader
});

const userService = new DomainUserService({
	userFactory: userFactory,
	userRepository: userRepository,
	eventSourcedObjectRepository: eventSourcedObjectRepository
});

const ensembleService = new DomainEnsembleService();

app.use("/graphql", async (req, res, next) => {
	graphqlExpress({
		schema,
		context: new Context({
			session: req.session,
			userReader: userReader,
			ensembleReader: ensembleReader,
			userService: userService,
			ensembleService: ensembleService
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
