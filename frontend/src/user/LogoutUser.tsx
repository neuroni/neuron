import * as React from "react";
import { Mutation, MutationOptions, FetchResult } from "react-apollo";
import { LOGOUT_USER_MUTATION } from "src/servergql/user";

export const LogoutUser = (props: {
    children: (
        logoutUser: (
            args: MutationOptions<any>
        ) => Promise<FetchResult<any>>
    ) => React.ReactNode
}) => (
    <Mutation mutation={LOGOUT_USER_MUTATION}>
        {props.children}
    </Mutation>
)