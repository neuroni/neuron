import * as React from "react";

import { Route, Switch } from "react-router";

import { CreateAdminUserPage } from "./pages/CreateAdminUserPage";
import { EnsemblePage } from "./pages/EnsemblePage";
import { EnsemblesPage } from "./pages/EnsemblesPage";
import { GetPageViewer } from "./viewer/GetPageViewer";
import { LoginPage } from "./pages/LoginPage";

export class Routes extends React.Component {
	public render() {
		return (
			<GetPageViewer>
				{props => {
					if (props.loading) {
						return <div />;
					}

					if (props.error) {
						return <div />;
					}

					if (!props.data || !props.data.viewer) {
						return <div />;
					}

					if (!props.data.viewer.hasSystemAdminUser) {
						return <CreateAdminUserPage />;
					}

					if (!props.data.viewer.user) {
						return <LoginPage />;
					}

					return (
						<Switch>
							<Route
								exact={true}
								path="/"
								component={EnsemblesPage}
							/>
							<Route
								path="/ensemble/:ensembleId"
								component={EnsemblePage}
							/>
						</Switch>
					);
				}}
			</GetPageViewer>
		);
	}
}
