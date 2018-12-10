import gql from "graphql-tag";

export const PAGE_VIEWER_QUERY = gql`
	query getPageViewer {
		viewer {
			user {
				id
				name
			}
			hasSystemAdminUser
		}
	}
`;
