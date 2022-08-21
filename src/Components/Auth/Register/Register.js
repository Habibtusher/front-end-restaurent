import { Button, Card, Form, Input, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { register } from "../../../Api/ApiConstant";
const Register = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const onFinish = async (values) => {
    const newData = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      email: values.email,
      password: values.password,
      passwordConfirm: values.passwordConfirm,
    };
    if (values.password !== values.passwordConfirm) {
      message.error("password mismatch");
    } else {
      try {
        const { data } = await axios.post(register, newData);
        if (data.status === "success") {
          message.success(data.message);
          history.push("/auth/login");
        }
      } catch (error) {
        message.error(error.response.data.message);
      }
      //   else if(data.status === "fail"){
      //     alert("i am on else");
      //     message.error(data.message);
      //   }
    }
  };
  return (
    <div className="register-form">
      <Card className="content-login">
        <Form layout="vertical" name="login-form" onFinish={onFinish}>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              {
                required: true,
                message: "Please input your first name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              {
                required: true,
                message: "Please input your last name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              {
                required: true,
                message: "Please input your last name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input your password",
              },
              {
                type: "email",
                message: "Please input valid email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password",
              },
            ]}
          >
            <Input.Password placeholder="***********" />
          </Form.Item>
          <Form.Item
            name="passwordConfirm"
            label="Confirm Password"
            rules={[
              {
                required: true,
                message: "Please input your password",
              },
            ]}
          >
            <Input.Password placeholder="***********" />
          </Form.Item>
          <Form.Item>
            <Link to="forgot-password" className="pb-1">
              Forget Password ?
            </Link>
            {/* <a
                  className="login-form-forgot float-right"
                  href="forgot-password"
                >
                  Forgot Password?
                </a> */}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Sign Up
            </Button>
          </Form.Item>
          <p>
            Already have an account? <Link to="/auth/login">Sign In</Link>
          </p>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
