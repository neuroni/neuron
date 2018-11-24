import * as React from "react";

import { Button, Grid } from "react-bootstrap";

import { AppendBottom } from "src/layout/AppendBottom";
import { EnsembleList } from "src/ensemble/EnsembleList";

export const EnsemblesPage = () => (
	<Grid fluid={false}>
		<AppendBottom>
			<Button>Luo kokonaisuus</Button>
		</AppendBottom>

		<EnsembleList />
	</Grid>
);
