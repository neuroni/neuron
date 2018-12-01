import * as React from "react";

import { CreateEnsemble } from "src/ensemble/CreateEnsemble";
import { EnsembleList } from "src/ensemble/EnsembleList";
import { Grid } from "react-bootstrap";

export const EnsemblesPage = () => (
	<Grid fluid={false}>
		<CreateEnsemble />

		<EnsembleList />
	</Grid>
);
