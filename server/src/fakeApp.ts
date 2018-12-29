import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as session from "express-session";

import { graphiqlExpress, graphqlExpress } from "apollo-server-express";

import { Context } from "./graphql/Context";
import { DomainEnsembleService } from "./ensemble/DomainEnsembleService";
import { DomainFileService } from "./file/DomainFileService";
import { DomainNoteService } from "./note/DomainNoteService";
import { DomainUserService } from "./user/DomainUserService";
import { EnsembleFactory } from "./ensemble/EnsembleFactory";
import { EnsembleRepository } from "./ensemble/EnsembleRepository";
import { EventSourcedObjectRepository } from "./eventsourcing/EventSourcedObjectRepository";
import { EventStorageFile } from "./eventsourcing/EventStorageFile";
import { FileDataRepository } from "./storage/FileDataRepository";
import { FilesystemStorageDriver } from "./storage/FilesystemStorageDriver";
import { MemoryEnsembleReader } from "./ensemble/MemoryEnsembleReader";
import { MemoryNoteReader } from "./note/MemoryNoteReader";
import { MemoryUserReader } from "./user/MemoryUserReader";
import { MockEventStore } from "./eventsourcing/MockEventStore";
import { NoteFactory } from "./note/NoteFactory";
import { NoteRepository } from "./note/NoteRepository";
import { UidGenerator } from "./common/UidGenerator";
import { UserFactory } from "./user/UserFactory";
import { UserRepository } from "./user/UserRepository";
import { schema } from "./schema";
import { uploadRouter } from "./upload/uploadRouter";

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

const noteFactory = new NoteFactory({
	uidgenerator: uidGenerator
});

const eventStorageFile = new EventStorageFile({
	path: "storedevents.json"
});

const filesystemStorageDriver = new FilesystemStorageDriver({
	directoryPath: "files"
});

const fileDataRepository = new FileDataRepository({
	storageDriver: filesystemStorageDriver
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

const noteReader = new MemoryNoteReader({
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

const noteRepository = new NoteRepository({
	noteFactory: noteFactory,
	noteReader: noteReader
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

const noteService = new DomainNoteService({
	eventSourcedObjectRepository: eventSourcedObjectRepository,
	noteFactory: noteFactory,
	noteRepository: noteRepository
});

const fileService = new DomainFileService();

eventStore.replayEvents();

app.use((req: any, res, next) => {
	req.fileDataRepository = fileDataRepository;
	req.fileService = fileService;
	req.ensembleService = ensembleService;

	next();
});

app.use("/upload", uploadRouter);

app.use("/graphql", async (req, res, next) => {
	graphqlExpress({
		schema,
		context: new Context({
			session: req.session,
			userReader: userReader,
			ensembleReader: ensembleReader,
			noteReader: noteReader,
			userService: userService,
			ensembleService: ensembleService,
			noteService: noteService
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
