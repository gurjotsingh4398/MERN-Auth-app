import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

import Navbar from "./Components/Navbar/Navbar";
import Landing from "./Components/Landing/Landing";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import PrivateRoute from "./Components/private-route/PrivateRoute";
import Dashboard from "./Components/Dashboard/Dashboard";

const setAuthToken = token => {
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

const logoutUser = () => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);

  // Set current user to empty object {} which will set isAuthenticated to false
  //globalState
  // /isAuthenticated: false,
  // user: {}
};

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  // store.dispatch(setCurrentUser(decoded));
  //        set globalState as->
  //         isAuthenticated: !isEmpty(decoded),
  //         user: decoded
  //       };

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    logoutUser();
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
