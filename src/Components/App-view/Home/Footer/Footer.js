import React from "react";
import {
  FaFacebookF,
  FaPinterestP,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer-dark">
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-3 item">
              <h3 className="footer-title">Services</h3>
              <ul>
                <li>
                  <a href="#">Rent For Party</a>
                </li>
                <li>
                  <a href="#">Serve Food</a>
                </li>
                <li>
                  <a href="#">Home Delivary</a>
                </li>
              </ul>
            </div>
            <div className="col-sm-6 col-md-3 item">
              <h3 className="footer-title">About</h3>
              <ul>
                <li>
                  <a href="#">Company</a>
                </li>
                <li>
                  <a href="#">Team</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
              </ul>
            </div>
            <div className="col-md-6 item text">
              <h3 className="footer-title">Food Fantasy Bhuapur</h3>
              <p>
               Food Fantasy is one of the best restaurants in bhuapur. It's highly decorated. We are waiting to serve you delicious food.
              </p>
            </div>
            <div className="col item social">
              <a target="_blank" href="https://www.facebook.com/Foodfantasyltd">
                <FaFacebookF className="icon ion-social-facebook" />
              </a>
              <a href="#">
                <FaTwitter className="icon ion-social-twitter" />
              </a>
              <a href="#">
                <FaPinterestP className="icon ion-social-snapchat" />
              </a>
              <a href="#">
                <AiFillInstagram className="icon ion-social-instagram" />
              </a>
              <a href="#">
                <FaYoutube className="icon ion-social-instagram" />
              </a>
            </div>
          </div>
          <p className="copyright">Foodfantasyltd © 2021</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
