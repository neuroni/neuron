import * as React from "react";

import { Button, Nav, NavItem, Navbar } from "react-bootstrap";

export const NavigationBar = () => (
	<Navbar>
		<Navbar.Header>
			<Navbar.Brand>Neuron</Navbar.Brand>
		</Navbar.Header>
		<Nav pullRight={true}>
			<NavItem
				style={{
					marginTop: "-7px",
					marginBottom: "-7px"
				}}
			>
				<Button>Kirjaudu</Button>
			</NavItem>
		</Nav>
	</Navbar>
);
