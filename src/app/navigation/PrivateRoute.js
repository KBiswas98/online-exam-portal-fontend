import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({
    _for = "student",
    component: Component,
    ...rest
}) {
    const { token, type } = useSelector((state) => state.AuthReducers);
    return (
        <Route
            {...rest}
            render={(props) =>
                token.length > 10 && type === _for ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: `/${_for}-login`,
                        }}
                    />
                )
            }
        />
    );
}
