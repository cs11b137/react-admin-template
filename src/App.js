import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import routes from "./routes";
import RouteGuard from "./components/RouteGuard";

const App = () => {
  return (
    <Router>
      <RouteGuard>
        <Switch>{routes}</Switch>
      </RouteGuard>
    </Router>
  );
};

export default App;
