import React, { lazy, Suspense, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Footer from "./Home/Footer/Footer.js";
import Home from "./Home/Home/Home.js";
import Navbar from "./Home/Layout/Navbar.js";
import Sidenav from "./Home/Layout/Sidenav.js";
import UserProfile from "./Home/UserProfile/UserProfile.js";
import MessengerCustomerChat from "react-messenger-customer-chat";
import Dashboard from "./Admin/Dashboard/Dashboard.js";
import Cart from "./Cart/Cart.js";
function AppView({ match }) {
  const [show,setShow] = useState(false)
  console.log(match);
  return (
    <>
      <Navbar setShow={setShow} show={show}/>
      <div style={{marginTop:"71px"}}>
          <Switch>
        <Route path={`${match.url}/home`}>
          <Home setShow={setShow} show={show} />
        </Route>
        <Route path={`${match.url}/user/profile`}>
          <UserProfile />
        </Route>
        <Route path={`${match.url}/admin/dashboard`}>
          <Dashboard setShow={setShow} show={show} />
        </Route>
        <Route path={`${match.url}/cart`}>
          <Cart  />
        </Route>
        <Route path={`${match.url}`}>
          <Redirect from={`${match.url}`} to={`${match.url}/home`} />
        </Route>
      </Switch>
      </div>
    
      <MessengerCustomerChat
        pageId="100761755404496"
        appId="425024506257537"
      />
      <Footer/>
    </>
  );
}

export default AppView;
