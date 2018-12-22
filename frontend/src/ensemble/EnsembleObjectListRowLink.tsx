import * as React from "react";

import { LinkContainer } from "react-router-bootstrap";

export const EnsembleObjectListRowLink = (props: {
	id: string;
	ensembleObjectType: string;
	children: React.ReactNode;
}) => {
	let link = "";

	// tslint:disable-next-line
	console.log("id", props.id);

	switch (props.ensembleObjectType) {
		case "Ensemble":
			link = "/ensemble/" + props.id;
			break;
		case "Note":
			link = "/note/" + props.id;
			break;
	}

	if (props.id === "") {
		return <div>{props.children}</div>;
	}

	return (
		<LinkContainer
			to={link}
			style={{
				cursor: "pointer"
			}}
		>
			{props.children}
		</LinkContainer>
	);
};
