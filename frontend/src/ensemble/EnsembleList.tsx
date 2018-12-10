import * as React from "react";

import { Panel, Table } from "react-bootstrap";

import { GetUserEnsembles } from "./GetUserEnsembles";
import { LinkContainer } from "react-router-bootstrap";

export const EnsembleList = () => (
	<Panel>
		<Panel.Heading>Kokonaisuudet</Panel.Heading>
		<Panel.Body>
			<GetUserEnsembles>
				{props => (
					<Table
						striped={true}
						bordered={true}
						condensed={true}
						hover={true}
					>
						<thead>
							<tr>
								<th>Nimi</th>
							</tr>
						</thead>
						<tbody>
							{props.data &&
								props.data.userEnsembles &&
								props.data.userEnsembles.ensembles &&
								props.data.userEnsembles.ensembles.map(p => {
									return (
										<LinkContainer
											key={p.id}
											to={"/ensemble/" + p.id}
											style={{
												cursor: "pointer"
											}}
										>
											<tr>
												<td>{p.name}</td>
											</tr>
										</LinkContainer>
									);
								})}
						</tbody>
					</Table>
				)}
			</GetUserEnsembles>
		</Panel.Body>
	</Panel>
);
