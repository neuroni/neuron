import * as React from "react";

import { AppendBottom } from "src/layout/AppendBottom";
import { CreateEnsembleMutation } from "./CreateEnsembleMutation";

export class CreateEnsemble extends React.Component {
	public state = {
		creating: false,
		name: ""
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
					<input type="text" value={this.state.name} onChange={(e) => {
						this.setState({
							name: e.target.value
						})
					}} />
					<button
						onClick={() => {
							this.setState({
								creating: false
							});
						}}
					>
						Peruuta
					</button>
					<CreateEnsembleMutation>
						{createEnsembleForUser => 			
						<button onClick={() => {
							createEnsembleForUser({
								variables: {
									name: this.state.name
								}
							})
						}}>
							Tallenna
						</button>}

					</CreateEnsembleMutation>
					
				</div>
			</AppendBottom>
		);
	}
}
