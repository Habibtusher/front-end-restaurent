
import React, { useEffect, useState } from "react";
import ProfilePaper from './ProfilePaper.js';
import { Link, NavLink } from "react-router-dom";
import { AiOutlineMenuUnfold } from "react-icons/ai";

import { get_user } from "../../../../Api/ApiConstant.js";
import { getData } from "../../../../Api/CommonService.js";
import { BsFillBagPlusFill } from "react-icons/bs";
import  './layout.css';
import { Typography } from "antd";
const Navbar = ({setShow}) => {
 
  const User = JSON.parse(localStorage.getItem("user"));
const [userProfile, setUserProfile] = useState()
const url = `${get_user}?email=${User?.email}`;
const handleShowsidebar = ()=>{
  setShow(true);
}
const getProfile = async () => {

  try {
    const { data } = await getData(url);

    if (data.status === "success") {
      setUserProfile(data.data[0]);
    }
  } catch (err) {
    console.log(err);
  }

};
useEffect(()=>{
  getProfile();
},[])
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark navbar-bg">
     <div className="container">
   
        <AiOutlineMenuUnfold onClick={()=>handleShowsidebar()} className="menu-icon"/>
        <Link className="navbar-brand" to="/">
          <img
            style={{ width: "80px" }}
            src="https://i.ibb.co/hFTdzyM/received-928227521113452.png"
            alt="received-928227521113452"
            border="0"
          />
        </Link>
        <div className="d-flex align-items-center ">
        {!User?.email ? (
              <div className="nav-item">
                <NavLink className="nav-link" to="/auth/login">
                  Login
                </NavLink>
              </div>
            ) : (
              <ProfilePaper key={User.id} userProfile={userProfile} user={User}/>
            )}
            <BsFillBagPlusFill className="cart-icon"/>
            </div>
     </div>
    </nav>

    </>
  );
};

export default Navbar;
