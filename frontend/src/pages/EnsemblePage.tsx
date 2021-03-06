import * as React from "react";

import { CreateEnsembleObjectSelectForm } from "src/ensemble/CreateEnsembleObjectSelectForm";
import { EnsembleObjectList } from "src/ensemble/EnsembleObjectList";
import { GetEnsemblePageEnsemble } from "src/ensemble/GetEnsemblePageEnsemble";
import { Grid } from "react-bootstrap";
import { match } from "react-router";

interface InputProps {
	match: match<{
		ensembleId: string;
	}>;
}

export const EnsemblePage = (args: InputProps) => (
	<div>
		<GetEnsemblePageEnsemble ensembleId={args.match.params.ensembleId}>
			{props => {
				if (props.loading || props.error || !props.data) {
					return <div />;
				}

				return (
					<Grid>
						<CreateEnsembleObjectSelectForm
							ensembleId={args.match.params.ensembleId}
						/>
						{props.data.ensemble && (
							<EnsembleObjectList
								ensembleId={args.match.params.ensembleId}
								ensembleObjects={
									props.data.ensemble.ensembleObjects
								}
							/>
						)}
					</Grid>
				);
			}}
		</GetEnsemblePageEnsemble>
	</div>
);
