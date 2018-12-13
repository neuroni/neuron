import * as React from "react";

import { CreateAdminUser } from "src/user/createAdminUser";
import { Grid } from "react-bootstrap";

export class CreateAdminUserPage extends React.Component {
	public state = {
		password: ""
	};

	public render() {
		return (
			<Grid>
				<div>
					<input type="text" value="admin" readOnly={true} />
				</div>
				<div>
					<input
						type="password"
						value={this.state.password}
						onChange={e => {
							this.setState({
								password: e.target.value
							});
						}}
					/>
				</div>
				<div>
					<CreateAdminUser>
						{createAdminAccount => (
							<button
								onClick={() => {
									createAdminAccount({
										variables: {
											password: this.state.password
										}
									});
								}}
							>
								Luo admin käyttäjä
							</button>
						)}
					</CreateAdminUser>
				</div>
			</Grid>
		);
	}
}
