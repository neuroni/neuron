import * as React from "react";

import Dropzone from "react-dropzone";
import { EnsembleObjectListRowLink } from "./EnsembleObjectListRowLink";
import { Table } from "react-bootstrap";
import { post } from "superagent";

export const EnsembleObjectList = (args: {
	ensembleId: string;
	ensembleObjects: Array<{
		id: string;
		name: string | null;
		type: string;
	}>;
}) => (
	<Dropzone
		onDrop={accepted => {
			const file = accepted[0];

			if (!file) {
				return;
			}

			const req = post("http://localhost:8897/upload");

			req.field({
				ensembleId: args.ensembleId
			});

			req.attach("file", file);

			req.end();
		}}
	>
		{({ getRootProps, isDragActive }) => {
			return (
				<div
					{...getRootProps()}
					style={{
						borderStyle: "solid",
						borderWidth: "1px",
						borderColor: isDragActive ? "green" : "black"
					}}
				>
					<Table
						striped={true}
						bordered={true}
						condensed={true}
						hover={true}
					>
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
				</div>
			);
		}}
	</Dropzone>
);
