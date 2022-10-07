import React, { lazy, Suspense } from "react";
import { Provider } from "react-redux";
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
import store from "./redux/store";


function App() {
  return (
    <Provider store={store}>
    <Router>
  
      <Switch>      
        <Route path="/app" component={AppView} />
        <Route path="/auth" component={AuthView} />
      
        <Route exact path="*">
         <Redirect from="/*" to="/app" />
        </Route>
      </Switch>
 
  </Router>
  </Provider>
  );
}

export default App;
