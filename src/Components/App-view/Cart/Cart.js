import { Button, message, Typography } from "antd";
import React, { useEffect, useState } from "react";

import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import CheckOutModal from "./CheckOutModal";
import {
  decrement,
  increment,
  quantityDecrement,
  quantityIncrement,
} from "../../../redux/Cart/actions";
import { Link, useHistory } from "react-router-dom";
const Cart = () => {
  const cartItem = useSelector((state) => state.cart);
  const [checkOutModal, setCheckOutModal] = useState(false);
  const [calculateTotalprice, setCalculateTotalprice] = useState();
  const history = useHistory();
  var userInfo = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const handleCheckout = () => {
    if (userInfo) {
      setCheckOutModal(true);
    } else {
      message.warning("please login first");
      history.push("/auth/login");
    }
  };
  const handleRemoveItem = (item) => {
    dispatch(decrement(item));
  };
  const IncreaseQuantity = (item) => {
    dispatch(quantityIncrement(item));
  };
  const DecreaseQuantity = (item) => {
    dispatch(quantityDecrement(item));
    // const cartItemCheck = cartItem.Carts.find((e) => e._id === item._id);
    // if (cartItemCheck.quantity > 1) {
    //   dispatch(quantityDecrement(item));
    // } else {
    //   dispatch(decrement(item));
    // }
  };

  useEffect(() => {
    console.log(cartItem.Carts);
    let totalprice = 0;
    for (let index = 0; index < cartItem.Carts?.length; index++) {
      totalprice +=
        cartItem.Carts[index].price * cartItem.Carts[index].quantity;
    }
    setCalculateTotalprice(totalprice);
    console.log(totalprice);
  }, [cartItem.Carts]);
  return (
    <div className="container cart-height cart-top-div">
      <div className="text-center ">
        <Typography className="cart-count-text">
          Your Cart ({cartItem.numberCart} Items){" "}
        </Typography>
        {cartItem.numberCart === 0 && <Link to="/app/home">Back to home</Link>}
      </div>

      {cartItem.numberCart !== 0 && (
        <div className="cart-page">
          <div className="cart-div">
            <table>
              <tr>
                <th>Items</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
              {cartItem.Carts.map((element, key) => (
                <tr key={key}>
                  <td>
                    <div className="cart-info">
                      <img src={element.image} />
                      <div>
                        <Typography className="product-name">
                          {element.name}
                        </Typography>
                        <Typography>Price: {element.price}৳</Typography>
                        <Typography
                          className="remove"
                          onClick={() => handleRemoveItem(element)}
                        >
                          Remove
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td>{element.price}৳</td>
                  <td>
                    <div className="d-flex quantity">
                      <AiOutlineMinusCircle
                        onClick={() => DecreaseQuantity(element)}
                        className="minus"
                      />
                      <p>{element.quantity}</p>

                      <AiOutlinePlusCircle
                        onClick={() => IncreaseQuantity(element)}
                        className="plus"
                      />
                    </div>
                  </td>
                  <td>{element.quantity * element.price} ৳</td>
                </tr>
              ))}
            </table>
          </div>
          <div className="total-price">
            <table>
              <tr>
                <td>Subtotal</td>
                <td>{calculateTotalprice}৳</td>
              </tr>
              <tr>
                <td>Tax</td>
                <td>00৳</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>{calculateTotalprice}৳</td>
              </tr>
            </table>
          </div>
          <div className="btn-text-align">
            <Button onClick={() => handleCheckout()} className="checkout-btn">
              Check Out
            </Button>
          </div>
        </div>
      )}

      <CheckOutModal
        cartItem={cartItem}
        calculateTotalprice={calculateTotalprice}
        setCheckOutModal={setCheckOutModal}
        checkOutModal={checkOutModal}
      />
    </div>
  );
};

export default Cart;
