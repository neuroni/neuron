import * as React from "react";

import { EnsembleObjectListRowLink } from "./EnsembleObjectListRowLink";
import { Table } from "react-bootstrap";

export const EnsembleObjectList = (args: {
	ensembleObjects: Array<{
		id: string;
		name: string | null;
		type: string;
	}>;
}) => (
	<Table striped={true} bordered={true} condensed={true} hover={true}>
		<thead>
			<tr>
				<th>Nimi</th>
				<th>Tyyppi</th>
			</tr>
		</thead>
		<tbody>
			{args.ensembleObjects.map(p => (
				<EnsembleObjectListRowLink
					id={p.id}
					key={p.id}
					ensembleObjectType={p.type}
				>
					<tr>
						<td>{p.name}</td>
						<td>{p.type}</td>
					</tr>
				</EnsembleObjectListRowLink>
			))}
		</tbody>
	</Table>
);
