import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import Store from "../../Store/Store";

const BasePrivateRoute = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => {
  window.console.log(isAuthenticated);
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

BasePrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const PrivateRoute = props => (
  <Store.Consumer>
    {value => <BasePrivateRoute value={value} {...props} />}
  </Store.Consumer>
);

export default PrivateRoute;
