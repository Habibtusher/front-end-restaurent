import { Button, message, Modal, Radio, Space, Typography } from "antd";
import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { MdOutlineDownloadDone } from "react-icons/md";
import { base_url } from "../../../Api/Baseurl";
import { useDispatch } from "react-redux";
import { cleanCart } from "../../../redux/Cart/actions";
import { useHistory } from "react-router-dom";
import { getAllData } from "../../../Api/CommonService";
import { generate_order } from "../../../Api/ApiConstant";
const CheckOutModal = ({
  checkOutModal,
  setCheckOutModal,
  calculateTotalprice,
  cartItem,
}) => {
  const [value, setValue] = useState(1);

  const [paymentStatus, setPaymentStatus] = useState(1);
  const dispatch = useDispatch();
  var userInfo = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const orderBtnDisable = value === 2 && paymentStatus !== 200;
  console.log("object,", orderBtnDisable);
  const makePayment = (token) => {
    const body = {
      token,
      product: cartItem.Carts,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(`${base_url}/payment`, {
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
  const handleOrder = async () => {
    const orderData = {
      address: userInfo.address,
      email: userInfo.email,
      phone: userInfo.phone,
      name: userInfo.firstName + " " + userInfo.lastName,
      items: cartItem,
      totalAmount: calculateTotalprice,
      date: Date.now(),
      paymentStatus: value === 1 ? "Cash on Dalivery" : "Paid",
      status:"Order Placed"
    };

    if (userInfo.address.state1 && userInfo.address.state) {
      const { data } = await getAllData(generate_order, orderData);
      console.log(data);
      message.success("order placed");
      dispatch(cleanCart());
    } else {
      message.error("please add your address");
      history.push("/app/user/profile");
    }

    console.log("userInfo", orderData);
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
          onClick={() => {
            handleOrder();
            setCheckOutModal(false);
          }}
          className="button-style"
          disabled={orderBtnDisable}
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
              amount={calculateTotalprice * 100}
              // shippingAddress
              // billingAddress
              stripeKey="pk_test_51Ljyj5SBDj4qcoMhNCjVsjWxtGGEVjMVgjiquW6ssXwZ3IStRyy5SzTO9OnhxYdyhwiRd7DJjo0sEHRoSJKNksaI00wGCHeCCL"
            />
          </div>
        )}
        {value === 2 && paymentStatus === 200 && (
          <div className="p-4 mt-2 text-center done-text">
            {" "}
            <MdOutlineDownloadDone className="ok-icon" /> Payment Done
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CheckOutModal;
