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
