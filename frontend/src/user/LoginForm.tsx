import * as React from "react";

import { LoginUser } from "./LoginUser";

export class LoginForm extends React.Component {
	public state = {
		userName: "",
		password: ""
	};

	public render() {
		return (
			<div>
				<div>
					<input
						type="text"
						value={this.state.userName}
						onChange={e => {
							this.setState({
								userName: e.target.value
							});
						}}
					/>
				</div>
				<div>
					<input
						type="text"
						value={this.state.password}
						onChange={e => {
							this.setState({
								password: e.target.value
							});
						}}
					/>
				</div>
				<div>
					<LoginUser>
						{loginUser => (
							<button
								onClick={() => {
									loginUser({
										variables: {
											userName: this.state.userName,
											password: this.state.password
										}
									});
								}}
							>
								Kirjaudu
							</button>
						)}
					</LoginUser>
				</div>
			</div>
		);
	}
}
