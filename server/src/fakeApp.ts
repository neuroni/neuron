import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as session from "express-session";

import { graphiqlExpress, graphqlExpress } from "apollo-server-express";

import { Context } from "./graphql/Context";
import { DomainEnsembleService } from "./ensemble/DomainEnsembleService";
import { DomainUserService } from "./user/DomainUserService";
import { EnsembleFactory } from "./ensemble/EnsembleFactory";
import { EnsembleRepository } from "./ensemble/EnsembleRepository";
import { EventSourcedObjectRepository } from "./eventsourcing/EventSourcedObjectRepository";
import { EventStorageFile } from "./eventsourcing/EventStorageFile";
import { MemoryEnsembleReader } from "./ensemble/MemoryEnsembleReader";
import { MemoryUserReader } from "./user/MemoryUserReader";
import { MockEventStore } from "./eventsourcing/MockEventStore";
import { UidGenerator } from "./common/UidGenerator";
import { UserFactory } from "./user/UserFactory";
import { UserRepository } from "./user/UserRepository";
import { schema } from "./schema";

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

const ensembleFactory = new EnsembleFactory({
	uidgenerator: uidGenerator
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

const ensembleRepository = new EnsembleRepository({
	ensembleFactory: ensembleFactory,
	ensembleReader: ensembleReader
});

const userService = new DomainUserService({
	userFactory: userFactory,
	userRepository: userRepository,
	eventSourcedObjectRepository: eventSourcedObjectRepository
});

const ensembleService = new DomainEnsembleService({
	ensembleFactory: ensembleFactory,
	ensembleRepository: ensembleRepository,
	eventSourcedObjectRepository: eventSourcedObjectRepository
});

eventStore.replayEvents();

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
