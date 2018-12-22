import gql from "graphql-tag";

export const USER_ENSEMBLES_QUERY = gql`
	query getUserEnsembles {
		userEnsembles {
			ensembles {
				id
				name
			}
		}
	}
`;

export const CREATE_ENSEMBLE_FOR_USER_MUTATION = gql`
	mutation createEnsembleForUser($name: String!) {
		createEnsembleForUser(name: $name) {
			success
			ensemble {
				id
				name
			}
		}
	}
`;

export const ENSEMBLE_PAGE_ENSEMBLE_QUERY = gql`
	query getEnsemblePageEnsemble($ensembleId: ID!) {
		ensemble(ensembleId: $ensembleId) {
			id
			name
			ensembleObjects {
				id
				name
				type
			}
		}
	}
`;

export const CREATE_ENSEMBLE_OBJECT_MUTATION = gql`
	mutation createEnsembleObject(
		$name: String!
		$parentEnsembleId: ID!
		$type: String!
	) {
		createEnsembleObject(
			name: $name
			parentEnsembleId: $parentEnsembleId
			type: $type
		) {
			success
		}
	}
`;
