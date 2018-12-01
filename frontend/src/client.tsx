import { ApolloLink, split } from "apollo-link";
import { InMemoryCache, defaultDataIdFromObject } from "apollo-cache-inmemory";
import { defaults, resolvers } from "./resolvers";

import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { withClientState } from "apollo-link-state";

const httpPort = process.env.REACT_APP_API_PORT
	? process.env.REACT_APP_API_PORT
	: window.location.port;

const protocol = window.location.protocol;
const isHttps = protocol.includes("https:");

export const getApiBaseUrl = () => {
	const port = httpPort;
	return `${window.location.protocol}//${
		process.env.REACT_APP_API_IP
			? process.env.REACT_APP_API_IP
			: window.location.host
	}:${port}`;
};

export const getBaseUrl = () => {
	return `${window.location.protocol}//${window.location.host}`;
};

const apiAddress = `${getApiBaseUrl()}/graphql`;

const cache = new InMemoryCache({
	dataIdFromObject: (o: any) => {
		switch (o.__typename) {
			case "Viewer":
				return "viewer";
			default:
				return defaultDataIdFromObject(o);
		}
	}
});

const httpLink = new HttpLink({
	uri: apiAddress,
	credentials: "include"
});

const wsLink = new WebSocketLink({
	uri: `${isHttps ? "wss" : "ws"}://${
		process.env.REACT_APP_API_IP
			? process.env.REACT_APP_API_IP
			: window.location.host
	}:${httpPort}/subscriptions`,
	options: {
		reconnect: true,
		lazy: true,
		connectionParams: () => {
			// tslint:disable-next-line
			console.log("websocket connectionParams");
		}
	}
});

const localState = withClientState({ cache, resolvers, defaults });

const normalLink = ApolloLink.from([localState, httpLink]);

const link = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === "OperationDefinition" &&
			definition.operation === "subscription"
		);
	},
	wsLink,
	normalLink
);

export const client = new ApolloClient({
	link,
	cache
});
