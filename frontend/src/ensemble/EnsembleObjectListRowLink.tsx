import * as React from "react";

import { LinkContainer } from "react-router-bootstrap";

export const EnsembleObjectListRowLink = (props: {
	id: string;
	ensembleObjectType: string;
	children: React.ReactNode;
}) => {
	let link = "";

	switch (props.ensembleObjectType) {
		case "Ensemble":
			link = "/ensemble/" + props.id;
			break;
		case "Note":
			link = "/note/" + props.id;
			break;
		case "File":
			link = "/file/" + props.id;
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
