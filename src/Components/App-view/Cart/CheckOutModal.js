import { Button, message, Modal, Radio, Space, Typography } from "antd";
import React, { useState } from "react";

import { MdOutlineDownloadDone } from "react-icons/md";
import { base_url } from "../../../Api/Baseurl";
import { useDispatch } from "react-redux";
import { cleanCart } from "../../../redux/Cart/actions";
import { useHistory } from "react-router-dom";
import { getAllData } from "../../../Api/CommonService";
import { generate_order } from "../../../Api/ApiConstant";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUSLISH_KEY);
const CheckOutModal = ({
  checkOutModal,
  setCheckOutModal,
  calculateTotalprice,
  cartItem,
}) => {
  const [value, setValue] = useState(1);

  const [paymentStatus, setPaymentStatus] = useState(1);
  const [paymentInfo, setPaymentInfo] = useState();
  const dispatch = useDispatch();
  var userInfo = JSON.parse(localStorage.getItem("user"));

  const history = useHistory();
  const onChange = (e) => {

    setValue(e.target.value);
  };
  const orderBtnDisable = value === 2 && paymentStatus !== 200;
  const handleOrder = async () => {
    console.log("click order");
    const orderData = {
      address: userInfo.address,
      email: userInfo.email,
      phone: userInfo.phone,
      name: userInfo.firstName + " " + userInfo.lastName,
      items: cartItem,
      totalAmount: calculateTotalprice,
      date: Date.now(),
      paymentStatus: value === 1 ? "Cash on Dalivery" : "Paid",
      status:"Order Placed",
      transactionId:paymentInfo?.transactionId ? paymentInfo?.transactionId : ""
    };

    if (userInfo.address.state1 && userInfo.address.state) {
      const { data } = await getAllData(generate_order, orderData);
      // toast('🦄 Wow so easy!', {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "colored",
      //   });
      toast.success("Order placed");
  
      dispatch(cleanCart());
      setCheckOutModal(false);
    } else {
      toast.error("please add your address");
      history.push("/app/user/profile");
    }

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
        {value === 2 && (
          <div className="p-4 text-center">
              <Elements stripe={stripePromise}>
            <CheckoutForm
            price={calculateTotalprice}
            email={userInfo.email}
            name={userInfo.firstName + " " + userInfo.lastName}
            setPaymentStatus={setPaymentStatus}
            setPaymentInfo={setPaymentInfo}
            />
            </Elements>
          </div>
        )}
        {/* {value === 2 && paymentStatus === 200 && (
         
        )} */}
      </div>
    </Modal>
  );
};

export default CheckOutModal;
