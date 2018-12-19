import * as React from "react";
import { GetEnsemblePageEnsemble } from "src/ensemble/GetEnsemblePageEnsemble";
import { match } from "react-router";
import { Grid } from "react-bootstrap";
import { EnsembleObjectList } from "src/ensemble/EnsembleObjectList";
import { CreateEnsembleObjectSelectForm } from "src/ensemble/CreateEnsembleObjectSelectForm";

interface InputProps {
	match: match<{
		ensembleId: string;
	}>;
};

export const EnsemblePage = (args: InputProps) => <div><GetEnsemblePageEnsemble ensembleId={args.match.params.ensembleId}> 
	{props => {
		if (props.loading || props.error || !props.data) {
			return <div />
		}

		// tslint:disable-next-line
		console.log("data", props.data.ensemble && props.data.ensemble.ensembleObjects);

		return <Grid>
			<CreateEnsembleObjectSelectForm />
			{props.data.ensemble && <EnsembleObjectList ensembleObjects={props.data.ensemble.ensembleObjects} />}
		</Grid>
	}}
	</GetEnsemblePageEnsemble></div>;
