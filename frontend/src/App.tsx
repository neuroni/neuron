import "./App.css";

import * as React from "react";

import { NavigationBar } from "./NavigationBar";
import { Routes } from "./Routes";

class App extends React.Component {
	public render() {
		return (
			<div>
				<NavigationBar />
				<Routes />
			</div>
		);
	}
}

export default App;
