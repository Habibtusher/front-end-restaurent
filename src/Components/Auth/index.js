import {  Switch, Route, Redirect } from "react-router-dom";
import Navbar from "../App-view/Home/Layout/Navbar.js";
import Sidenav from "../App-view/Home/Layout/Sidenav.js";
import Login from "./Login/Login.js";
import Register from "./Register/Register.js";

function AuthView({match}) {
  return (
   
    <Switch>
        <Route  path={`${match.url}/login`}><Login/></Route>
        <Route  path={`${match.url}/register`}><Register/></Route>
      
    </Switch>
  );
}

export default AuthView;
