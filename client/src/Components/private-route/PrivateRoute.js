import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import Store from "../../Store/context";

const BasePrivateRoute = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => {
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
  isAuthenticated: PropTypes.object
};

const PrivateRoute = props => {
  return (
    <Store.Consumer>
      value => return <BasePrivateRoute value={value} {...props} />;
    </Store.Consumer>
  );
};

export default PrivateRoute;
