import * as ensemble from "./Ensemble";
import * as note from "./Note";
import * as user from "./User";
import * as viewer from "./Viewer";

import { merge } from "lodash";

export const resolvers = merge(user, viewer, ensemble, note);
