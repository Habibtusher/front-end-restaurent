import { LockOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input, message } from "antd";
import remember from "../../../image/svg/remember-icon.svg";
import uncheck from "../../../image/svg/uncheck-icon.svg";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../../Api/ApiConstant";
import axios from "axios";

const Login = () => {
  const [isRemember, setIsRemember] = useState(false);
  const [loading, setLoading] = useState(false);
const history = useHistory()
  const onFinish = async (values) => {
    try {
      const { data } = await axios.post(login, values);
      if (data.status === "success") {
        message.success("success");
        // console.log(data.data.user);
        
        localStorage.setItem("access_token",JSON.stringify(data.token));
        localStorage.setItem("user",JSON.stringify(data.data.user));
        history.push("")
      }
    } catch (err) {
      message.error(err.response.data.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="login-form">
      <Card className="content-login">
        <Form layout="vertical" name="login-form" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input your password",
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
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <div className="d-flex justify-content-between align-items-center">
                {/* <Checkbox>Remember me</Checkbox> */}
                <div className="d-flex justify-content-between align-items-center gap-3">
                  <img
                    onClick={() => setIsRemember(!isRemember)}
                    style={{ cursor: "pointer" }}
                    className="img-fluid pr-3 pb-3"
                    src={isRemember ? remember : uncheck}
                    alt=""
                  />{" "}
                  <p> Remember me</p>
                </div>
                <Link to="forgot-password" className="pb-1">
                  Forget Password ?
                </Link>
                {/* <a
                  className="login-form-forgot float-right"
                  href="forgot-password"
                >
                  Forgot Password?
                </a> */}
              </div>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Log In
            </Button>
          </Form.Item>
          <p>
            Don't have an account yet? <Link to="/auth/register">Sign Up</Link>
          </p>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
