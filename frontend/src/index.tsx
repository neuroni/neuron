import "core-js/es6/map";
import "core-js/es6/set";
import "es6-string-polyfills";
import "es6-weak-map/implement";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { ApolloProvider } from "react-apollo";
import App from "./App";
import { client } from "./client";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById("root") as HTMLElement
);
registerServiceWorker();
