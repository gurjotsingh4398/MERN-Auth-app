import React, { Component } from "react";
import Store from "./context";
const isEmpty = require("is-empty");

class CentralStore extends Component {
  state = {
    // showMenu: false,
    isAuthenticated: false,
    user: {},
    loading: false
  };

  setIsAuthenticated = decoded => {
    this.setState({
      isAuthenticated: !isEmpty(decoded),
      user: decoded
    });
  };

  logout = () => {
    this.setState({
      isAuthenticated: false,
      user: {}
    });
  };

  // toggleShowMenu = () => {
  //   this.setState(state => {
  //     return { showMenu: !state.showMenu };
  //   });
  // };

  render() {
    return (
      <Store.Provider
        value={{
          ...this.state,
          setIsAuthenticated: this.setIsAuthenticated,
          logout: this.logout
        }}
        // value={{ ...this.state, toggleShowMenu: this.toggleShowMenu }}
      >
        {this.props.children}
      </Store.Provider>
    );
  }
}

export default CentralStore;
