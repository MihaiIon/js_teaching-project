import React, { Component } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

// Import routes
import home from "./home";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={home} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
