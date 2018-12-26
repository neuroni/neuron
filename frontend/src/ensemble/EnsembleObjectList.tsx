import * as React from "react";

import Dropzone from "react-dropzone";
import { EnsembleObjectListRowLink } from "./EnsembleObjectListRowLink";
import { Table } from "react-bootstrap";
import { post } from "superagent";

const baseStyle = {
	width: 200,
	height: 200,
	borderWidth: 2,
	borderColor: "#666",
	borderStyle: "dashed",
	borderRadius: 5
};
const activeStyle = {
	borderStyle: "solid",
	borderColor: "#6c6",
	backgroundColor: "#eee"
};
// const rejectStyle = {
// 	borderStyle: "solid",
// 	borderColor: "#c66",
// 	backgroundColor: "#eee"
// };

export const EnsembleObjectList = (args: {
	ensembleObjects: Array<{
		id: string;
		name: string | null;
		type: string;
	}>;
}) => (
	<Dropzone
		onDrop={accepted => {
			const file = accepted[0];

			// tslint:disable-next-line
			console.log("onDrop", file);

			if (!file) {
				return;
			}

			const req = post("http://localhost:8897/upload");

			req.attach("file", file);

			req.end();
		}}
	>
		{({ getRootProps, getInputProps, isDragActive }) => {
			let styles = { ...baseStyle };
			styles = isDragActive ? { ...styles, ...activeStyle } : styles;
			// styles = isDragReject ? { ...styles, ...rejectStyle } : styles;

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
