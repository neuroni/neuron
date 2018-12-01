import * as React from "react";

import { AppendBottom } from "src/layout/AppendBottom";

export class CreateEnsemble extends React.Component {
	public state = {
		creating: false
	};

	public render() {
		if (!this.state.creating) {
			return (
				<AppendBottom>
					<button
						onClick={() => {
							this.setState({
								creating: true
							});
						}}
					>
						Luo ensemble
					</button>
				</AppendBottom>
			);
		}

		return (
			<AppendBottom>
				<div>
					<input type="text" />
					<button
						onClick={() => {
							this.setState({
								creating: false
							});
						}}
					>
						Peruuta
					</button>
					<button>Tallenna</button>
				</div>
			</AppendBottom>
		);
	}
}
