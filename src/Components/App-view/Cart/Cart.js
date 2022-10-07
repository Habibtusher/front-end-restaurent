import { Button, Typography } from "antd";
import React, { useState } from "react";

import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import "./Cart.css";
import { useSelector } from "react-redux";
import CheckOutModal from "./CheckOutModal";
const Cart = () => {
  const cartItem = useSelector((state) => state.cart);
  const [checkOutModal, setCheckOutModal] = useState(false);

  const handleCheckout = () => {
    setCheckOutModal(true);
  }
  return (
    <div className="container cart-height">
      <div className="text-center mt-4">
        <Typography className="cart-count-text">
          Your Cart ({cartItem.numberCart} Items){" "}
        </Typography>
      </div>
      {cartItem.numberCart !== 0 && (
        <div className="cart-page">
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
                      <Typography className="remove">Remove</Typography>
                    </div>
                  </div>
                </td>
                <td>{element.price}৳</td>
                <td>
                  <div className="d-flex quantity">
                    <AiOutlineMinusCircle className="minus" />
                    <p>{element.quantity}</p>

                    <AiOutlinePlusCircle className="plus" />
                  </div>
                </td>
                <td>{element.quantity * element.price} ৳</td>
              </tr>
            ))}
          </table>

          <div className="total-price">
            <table>
              <tr>
                <td>Subtotal</td>
                <td>240৳</td>
              </tr>
              <tr>
                <td>Tax</td>
                <td>40৳</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>280৳</td>
              </tr>
            </table>
          </div>
          <div className="btn-text-align">
            <Button onClick={handleCheckout} className="checkout-btn">Check Out</Button>
          </div>
        </div>
      )}
      <CheckOutModal setCheckOutModal={setCheckOutModal} checkOutModal={checkOutModal}/>
    </div>
  );
};

export default Cart;
