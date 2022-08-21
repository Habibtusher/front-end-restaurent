import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import AppView from "./Components/App-view";
import Dashboard from "./Components/App-view/Admin/Dashboard/Dashboard";
import Navbar from "./Components/App-view/Home/Layout/Navbar";
import AuthView from "./Components/Auth";


function App() {
  return (
    <Router>
  
      <Switch>      
        <Route path="/app" component={AppView} />
        <Route path="/auth" component={AuthView} />
      
        <Route exact path="*">
         <Redirect from="/*" to="/app" />
        </Route>
      </Switch>
 
  </Router>
  );
}

export default App;
