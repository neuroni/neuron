import "./App.css";

import * as React from "react";

import { BrowserRouter } from "react-router-dom";
import { NavigationBar } from "./NavigationBar";
import { Routes } from "./Routes";

class App extends React.Component {
	public render() {
		return (
			<BrowserRouter>
				<div>
					<NavigationBar />
					<Routes />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
