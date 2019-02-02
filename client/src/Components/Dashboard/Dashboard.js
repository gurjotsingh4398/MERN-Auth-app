import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import Store from "../../Store/context";

class BaseDashboard extends Component {
  setAuthToken = token => {
    if (token) {
      // Apply authorization token to every request if logged in
      axios.defaults.headers.common["Authorization"] = token;
    } else {
      // Delete auth header
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  logoutUser = () => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    this.setAuthToken(false);

    // Set current user to empty object {} which will set isAuthenticated to false
    this.props.value.logout();
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.logoutUser();
  };

  render() {
    const { user } = this.props.value;
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into a full-stack{" "}
                <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
              </p>
            </h4>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

BaseDashboard.PropTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const Dashboard = () => (
  <Store.Consumer>{value => <BaseDashboard value={value} />}</Store.Consumer>
);

export default Dashboard;
