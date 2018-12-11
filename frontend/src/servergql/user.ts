import gql from "graphql-tag";

export const CREATE_ADMIN_USER_MUTATION = gql`
	mutation createAdminUser($password: String!) {
		createAdminUser(password: $password) {
			success
			viewer {
				hasSystemAdminUser
			}
		}
	}
`;

export const LOGIN_USER_MUTATION = gql`
	mutation login($userName: String!, $password: String!) {
		login(userName: $userName, password: $password) {
			success
			viewer {
				user {
					id
					name
				}
			}
		}
	}
`;

export const LOGOUT_USER_MUTATION = gql`
	mutation logout { 
		logout {
			success
			viewer {
				user {
					id
					name
				}
			}
		}
	}
`;
