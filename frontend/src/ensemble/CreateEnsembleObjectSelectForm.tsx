import * as React from "react";

import { CreateEnsembleObjectMutation } from "./CreateEnsembleObjectMutation";

export class CreateEnsembleObjectSelectForm extends React.Component<{
	ensembleId: string;
}> {
	public state = {
		selectedEnsembleObjectType: "",
		name: ""
	};

	public render() {
		return (
			<div>
				<div>
					<input
						type="text"
						value={this.state.name}
						onChange={e => {
							this.setState({
								name: e.target.value
							});
						}}
					/>
				</div>
				<div>
					<select
						value={this.state.selectedEnsembleObjectType}
						onChange={e => {
							this.setState({
								selectedEnsembleObjectType: e.target.value
							});
						}}
					>
						<option value="Ensemble">Kokonaisuus</option>
						<option value="Note">Muistilappu</option>
					</select>
				</div>
				<CreateEnsembleObjectMutation>
					{createEnsembleObject => (
						<button
							onClick={() => {
								createEnsembleObject({
									variables: {
										name: this.state.name,
										parentEnsembleId: this.props.ensembleId,
										type: this.state
											.selectedEnsembleObjectType
									}
								});
							}}
						>
							Luo
						</button>
					)}
				</CreateEnsembleObjectMutation>
			</div>
		);
	}
}
