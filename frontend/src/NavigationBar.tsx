import * as React from "react";

import { Button, Nav, NavItem, Navbar } from "react-bootstrap";

import { GetPageViewer } from "./viewer/GetPageViewer";
import { LogoutUser } from "./user/LogoutUser";

export const NavigationBar = () => (
	<Navbar>
		<Navbar.Header>
			<Navbar.Brand>Neuron</Navbar.Brand>
		</Navbar.Header>
		<Nav pullRight={true}>
			<GetPageViewer>
				{props => {
					if (props.loading || props.error || !props.data) {
						return <div />;
					}

					if (!props.data.viewer.user) {
						return (
							<NavItem
								style={{
									marginTop: "-7px",
									marginBottom: "-7px"
								}}
							>
								<Button>Kirjaudu</Button>
							</NavItem>
						);
					}

					return (
						<NavItem
							style={{
								marginTop: "-7px",
								marginBottom: "-7px"
							}}
						>
							{props.data.viewer.user.name}
							<LogoutUser>{logoutUser => <Button onClick={() => {
								logoutUser({})
							}}>
								Kirjaudu ulos
							</Button>}</LogoutUser>

						</NavItem>
					);
				}}
			</GetPageViewer>
		</Nav>
	</Navbar>
);
