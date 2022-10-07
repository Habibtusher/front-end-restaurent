import { Button, Modal, Radio, Space, Typography } from "antd";
import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import {MdOutlineDownloadDone} from "react-icons/md"
const CheckOutModal = ({ checkOutModal, setCheckOutModal }) => {
  const [value, setValue] = useState(1);
  const [product, setProduct] = useState({
    name: "T-shirt",
    price: 100,
    productBy: "yellow",
  });
  const [paymentStatus, setPaymentStatus] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const orderBtnDisable = (value === 2 && paymentStatus !== 200);
  console.log("object,",orderBtnDisable);
  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(`http://localhost:5000/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((res) => {
        console.log(res);
        const { status } = res;
        console.log("status", status);
        setPaymentStatus(status);
     
      })
      .catch((err) => console.log(err));
  };
  return (
    <Modal
      title="Check Out"
      centered
      visible={checkOutModal}
      onOk={() => setCheckOutModal(false)}
      onCancel={() => setCheckOutModal(false)}
      footer={[
        <Button onClick={() => setCheckOutModal(false)}>Cancel</Button>,
        <Button
          onClick={() => setCheckOutModal(false)}
          className="button-style"
          disabled={orderBtnDisable }
        >
          Order Now
        </Button>,
      ]}
    >
      <div style={{ minHeight: "170px" }}>
        <Typography className="mb-2">Select Payment Method</Typography>
        <Radio.Group onChange={onChange} value={value}>
          <Space direction="vertical">
            <Radio value={1}>Cash On Delivery</Radio>
            <Radio value={2}>Card Payment</Radio>
          </Space>
        </Radio.Group>
        {value === 2 && paymentStatus !== 200 && (
          <div className="p-4 text-center">
            <StripeCheckout
              token={makePayment}
              name="Pay Now"
              amount={100 * 100}
              // shippingAddress
              // billingAddress
              stripeKey="pk_test_51Ljyj5SBDj4qcoMhNCjVsjWxtGGEVjMVgjiquW6ssXwZ3IStRyy5SzTO9OnhxYdyhwiRd7DJjo0sEHRoSJKNksaI00wGCHeCCL"
            />
          </div>
        )}
         {value === 2 && paymentStatus === 200 && (
          <div className="p-4 mt-2 text-center done-text"> <MdOutlineDownloadDone className="ok-icon"/> Payment Done</div>
        )}
      </div>
    </Modal>
  );
};

export default CheckOutModal;
