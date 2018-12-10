import * as React from "react";

import { Grid, Panel } from "react-bootstrap";

import { LoginForm } from "src/user/LoginForm";

export const LoginPage = () => (
	<Grid>
		<Panel>
			<Panel.Heading>Kirjaudu sisään</Panel.Heading>
			<Panel.Body>
				<LoginForm />
			</Panel.Body>
		</Panel>
	</Grid>
);
