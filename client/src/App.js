import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Landing from "./Components/Landing/Landing";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Router>
      </div>
    );
  }
}

export default App;
