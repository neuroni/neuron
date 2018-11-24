import * as React from "react";

import { Panel, Table } from "react-bootstrap";

export const EnsembleList = () => (
	<Panel>
		<Panel.Heading>Kokonaisuudet</Panel.Heading>
		<Panel.Body>
			<Table striped={true} bordered={true} condensed={true} hover={true}>
				<thead>
					<tr>
						<th>#</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Username</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>Mark</td>
						<td>Otto</td>
						<td>@mdo</td>
					</tr>
					<tr>
						<td>2</td>
						<td>Jacob</td>
						<td>Thornton</td>
						<td>@fat</td>
					</tr>
					<tr>
						<td>3</td>
						<td>Larry the Bird</td>
						<td>@twitter</td>
					</tr>
				</tbody>
			</Table>
		</Panel.Body>
	</Panel>
);
