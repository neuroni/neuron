import * as React from "react";
import { Table } from "react-bootstrap";

export const EnsembleObjectList = (args: {
    ensembleObjects: Array<({
        id: string,
        name: string | null,
        type: string,
    }
    )>
}) => <Table striped={true}
    bordered={true}
    condensed={true}
    hover={true}>
        <thead>
            <tr><th>
                Nimi
            </th>
                <th>Tyyppi</th></tr>
        </thead>
        <tbody>
            {args.ensembleObjects.map(p => <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.type}</td>
            </tr>)}
        </tbody>
    </Table>