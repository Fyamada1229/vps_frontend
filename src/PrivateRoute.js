// PrivateRoute.js
import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, isPublic = false, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated || isPublic ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
