import React, { useEffect, useState } from "react";
import ProfilePaper from "./ProfilePaper.js";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineMenuUnfold } from "react-icons/ai";

import { get_user } from "../../../../Api/ApiConstant.js";
import { getData } from "../../../../Api/CommonService.js";
import { BsFillBagPlusFill } from "react-icons/bs";
import "./layout.css";
import { Badge, Typography } from "antd";
import { useSelector } from "react-redux";
const Navbar = ({ setShow }) => {
  const User = JSON.parse(localStorage.getItem("user"));
  const [userProfile, setUserProfile] = useState();
  const url = `${get_user}?email=${User?.email}`;

  const cartCount = useSelector((state) => state.cart.length)

  const handleShowsidebar = () => {
    setShow(true);
  };
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
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <>
      <nav style={{zIndex:"111"}} className="navbar navbar-expand-lg navbar-dark navbar-bg fixed-top">
        <div className="container">
          <div className="d-flex align-items-center">
            <AiOutlineMenuUnfold
              onClick={() => handleShowsidebar()}
              className="menu-icon"
            />
            <Link className="navbar-brand" to="/">
              <img
                style={{ width: "80px" }}
                src="https://i.ibb.co/hFTdzyM/received-928227521113452.png"
                alt="received-928227521113452"
                border="0"
              />
            </Link>
          </div>
          <div className="d-flex align-items-center ">
            {!User?.email ? (
              <div className="nav-item">
                <NavLink className="nav-link" to="/auth/login">
                  Login
                </NavLink>
              </div>
            ) : (
              <ProfilePaper
                key={User.id}
                userProfile={userProfile}
                user={User}
              />
            )}
            <NavLink className="nav-link" to="/app/cart">
            <Badge count={cartCount}>
              <BsFillBagPlusFill className="cart-icon" />
            </Badge>
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
