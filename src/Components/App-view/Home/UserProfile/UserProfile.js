import {
  Anchor,
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Spin,
  Switch,
  Table,
  Typography,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  delete_user,
  get_user,
  order_by_email,
  update_user_profile,
} from "../../../../Api/ApiConstant";
import Sidenav from "../Layout/Sidenav";
import axios from "axios";
import UpdateUserModal from "./UpdateUserModal";
import { DeleteOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import DeleteConfirmModal from "../../../CommonModal/DeleteConfirmModal";
import {
  deleteUserProfile,
  getData,
  updateProfile,
} from "../../../../Api/CommonService";
import "./userProfile.css";
import ViewOrderDetails from "./ViewOrderDetails";
const { Paragraph, Text } = Typography;
const { Link } = Anchor;
const UserProfile = () => {
  const [targetOffset, setTargetOffset] = useState(undefined);
  const [userProfile, setUserProfile] = useState();
  const [modal1Visible, setModal1Visible] = useState(true);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [itemsDetailsModal, setItemsDetailsModal] = useState(false);
  const [profileSteps, setProfileSteps] = useState(1);
  const User = JSON.parse(localStorage.getItem("user"));

  const access_token = JSON.parse(localStorage.getItem("access_token"));
  const [newValue, setNewValu] = useState();
  const [orders, setOrders] = useState();
  const [itemDetails, setItemDetails] = useState();
  const history = useHistory();
  const url = `${get_user}?email=${User.email}`;

  const getProfile = async () => {
    setLoading(true);
    try {
      const { data } = await getData(url);

      if (data.status === "success") {
        setUserProfile(data.data[0]);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  const getOrder = async () => {
    try {
      const { data } = await getData(`${order_by_email}?email=${User.email}`);

      if (data.status === "success") {
        setOrders(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onFinish = async (values) => {
    setLoading(true);
    const newData = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      email: values.email,
      password: values.password,
      passwordConfirm: values.passwordConfirm,
      dateOfBirth: values.dateOfBirth,
      address: {
        state1: values.address1,
        state2: values.address2,
        city: values.city,
        state: values.state,
        country: values.country,
        zipcode: values.zipcode,
      },
    };
    try {
      const { data } = await updateProfile(
        `${update_user_profile}${User.email}`,
        newData
      );
      if (data.status === "success") {
        message.success("profile update successfully");
        setModal1Visible(true);
        getProfile();
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
    localStorage.setItem("user", JSON.stringify(newData));
  };
  form.setFieldsValue({
    firstName: userProfile?.firstName,
    lastName: userProfile?.lastName,
    phone: userProfile?.phone,
    email: userProfile?.email,
    address1: userProfile?.address?.state1
      ? userProfile?.address?.state1
      : "N/A",
    address2: userProfile?.address?.state2
      ? userProfile?.address?.state2
      : "N/A",
    state: userProfile?.address?.state ? userProfile?.address?.state : "N/A",
    city: userProfile?.address?.city ? userProfile?.address?.city : "N/A",
    country: userProfile?.address?.country
      ? userProfile?.address?.country
      : "N/A",
    zipcode: userProfile?.address?.zipcode
      ? userProfile?.address?.zipcode
      : "N/A",
    dateOfBirth: userProfile?.dateOfBirth ? userProfile?.dateOfBirth : "N/A",
  });
  useEffect(() => {
    getProfile();
    getOrder();
  }, []);
  const handleDeleteAccount = async () => {
    setDeleteConfirmVisible(true);
  };
  const deleteUserConfirm = async () => {
    try {
      const { data } = await deleteUserProfile(`${delete_user}${User.email}`);
      if (data.status === "success") {
        message.success("profile deleted successfully");
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        history.push("");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const uploadProfileImage = async (url) => {
    const newData = {
      photo: url,
    };
    try {
      const { data } = await updateProfile(
        `${update_user_profile}${User.email}`,
        newData
      );
      if (data.status === "success") {
        message.success("profile update successfully");
        setModal1Visible(true);
        getProfile();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const uploadImage = async (options) => {
    setButtonLoading(true);
    const { file } = options;

    const imageData = new FormData();
    imageData.set("key", "ac8d9f66a12ed78ebde2e2558428a077");
    imageData.append("image", file);
    try {
      const { data } = await axios.post(
        "https://api.imgbb.com/1/upload",
        imageData
      );
      if (data.success === true) {
        uploadProfileImage(data.data.display_url);
        setButtonLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteProfileImage = async () => {
    const newData = {
      photo: "",
    };
    try {
      const { data } = await updateProfile(
        `${update_user_profile}${User.email}`,
        newData
      );
      if (data.status === "success") {
        message.success("profile image deleted");
        setModal1Visible(true);
        getProfile();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleViewDetails = (id) => {
    const singleOrder = orders.find((e) => e._id === id);
    setItemDetails(singleOrder?.items);
    setItemsDetailsModal(true);
  };
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("-");
  }
  const columns = [
    {
      title: (
        <Typography className="dashboard-table-header text-center">
          Items
        </Typography>
      ),
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return (
          <Typography
            onClick={() => {
              handleViewDetails(record._id);
            }}
            className="items-detail text-center"
          >
            View Items
          </Typography>
        );
      },
    },
    {
      title: (
        <Typography className="dashboard-table-header text-center">
          Payment Status
        </Typography>
      ),
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (_, record) => {
        return (
          <div className="d-flex align-items-center justify-content-center">
            <Typography>{record.paymentStatus}</Typography>
          </div>
        );
      },
    },
    {
      title: (
        <Typography className="dashboard-table-header text-center">
          Total Price
        </Typography>
      ),
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (_, record) => {
        return (
          <div className="d-flex align-items-center justify-content-center">
            <Typography>৳{record.totalAmount}</Typography>
          </div>
        );
      },
    },
    {
      title: (
        <Typography className="dashboard-table-header text-center">
          Status
        </Typography>
      ),
      dataIndex: "discountPrice",
      key: "discountPrice",
      render: (_, record) => {
        return (
          <div className="d-flex align-items-center justify-content-center">
            <Typography>{record.status}</Typography>
          </div>
        );
      },
    },
    {
      title: (
        <Typography className="dashboard-table-header text-center">
          Date
        </Typography>
      ),
      dataIndex: "date",
      key: "date",
      render: (_, record) => {
        return (
          <Typography className="d-flex align-items-center justify-content-center">
            {" "}
            {formatDate(record.date)}
          </Typography>
        );
      },
    },
  ];
  return (
    <Spin spinning={loading}>
      <div className="container user-top ">
        {/* <div style={{ display: "flex" }}>
          <Avatar
            size={50}
            src={
              userProfile?.photo
                ? userProfile?.photo
                : "https://joeschmoe.io/api/v1/random"
            }
          />
          <div style={{ marginLeft: "15px" }}>
            <Typography.Title
              level={2}
              style={{ margin: 0, fontSize: "25px", color: "#595959" }}
            >
              Profile Info
            </Typography.Title>
            <Paragraph style={{ marginTop: "-2px", fontSize: "13px" }}>
              Set Up Your Profile Info
            </Paragraph>
          </div>
        </div> */}

        <Row gutter={[5, 5]} style={{ marginTop: "20px" }}>
          <Col
            md={{ span: 7 }}
            lg={{ span: 6 }}
            xs={{ span: 24 }}
            className="account-sidebar-card"
          >
            <Card
              style={{
                width: 200,
                padding: "10px",
              }}
            >
              <Typography
                className={
                  profileSteps === 1
                    ? "profile-steps-selected profile-steps"
                    : "profile-steps"
                }
                onClick={() => setProfileSteps(1)}
              >
                Profile Detail{" "}
              </Typography>
              <Typography
                className={
                  profileSteps === 2
                    ? "profile-steps-selected profile-steps"
                    : "profile-steps"
                }
                onClick={() => setProfileSteps(2)}
              >
                Order History{" "}
              </Typography>
              <Typography
                className={
                  profileSteps === 3
                    ? "profile-steps-selected profile-steps"
                    : "profile-steps"
                }
                onClick={() => setProfileSteps(3)}
              >
                Security{" "}
              </Typography>
            </Card>
            {/* <Card
              style={{
                width: 200,
                padding: "10px",
               
              }}
            >
              <Anchor affix={false} targetOffset={targetOffset}>
                <Link
                  style={{
                    display: "block",
                    paddingBottom: "12px",
                    color: "#595959",
                  }}
                  href="#profile"
                  title="Profile Info"
                />

                <Link
                  style={{
                    display: "block",
                    paddingBottom: "12px",
                    color: "#595959",
                  }}
                  href="#history"
                  title="Order History"
                />

                <Link
                  style={{
                    display: "block",
                    paddingBottom: "12px",
                    color: "#595959",
                  }}
                  href="#security"
                  title="Account Security"
                />
              </Anchor>
            </Card> */}
          </Col>
          <Col
            className=" "
            md={{ span: 18 }}
            lg={{ span: 18 }}
            xs={{ span: 24 }}
            style={{ position: "relative" }}
          >
            {profileSteps === 1 && (
              <Card className="p-3">
                <div id="profile">
                  <div className="d-flex justify-content-between">
                    <Typography style={{ fontSize: "20px" }}>
                      Profile Details
                    </Typography>
                    <div>
                      <Button
                        onClick={() => setModal1Visible(false)}
                        className="button-style"
                      >
                        {" "}
                        Edit Profile
                      </Button>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex mt-3" name="userProfileImage">
                      <Avatar
                        size={80}
                        src={
                          userProfile?.photo
                            ? userProfile?.photo
                            : "https://joeschmoe.io/api/v1/random"
                        }
                      />

                      <Upload
                        className="mt-4"
                        customRequest={uploadImage}
                        showUploadList={false}
                      >
                        <Button
                          style={{
                            marginLeft: "20px",
                            backgroundColor: "#334669",
                            color: "#FFFFFF",
                            borderRadius: "5px",
                          }}
                          loading={buttonLoading}
                        >
                          Upload
                        </Button>
                      </Upload>

                      <Button
                        className="mt-4"
                        style={{
                          marginLeft: "20px",
                        
                        }}
                        icon={
                          <DeleteOutlined
                            style={{ fontSize: "20px", color: "red" }}
                            onClick={() => deleteProfileImage()}
                          />
                        }
                      ></Button>
                    </div>
                  </div>
                  <Form
                    className="mt-3"
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                  >
                    <Row gutter={[20, 16]}>
                      <Col xs={24} sm={12}>
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
                          <Input disabled={modal1Visible} />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
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
                          <Input disabled={modal1Visible} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={[20, 16]}>
                      <Col xs={24} sm={12}>
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
                          <Input disabled={modal1Visible} />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        {modal1Visible ? (
                          <Form.Item name="email" label="Email">
                            <Input disabled={true} />
                          </Form.Item>
                        ) : (
                          <Form.Item
                            name="email"
                            label="Email (Email Address cannot be changed)"
                          >
                            <Input disabled={true} />
                          </Form.Item>
                        )}
                      </Col>
                    </Row>
                    <Row gutter={[20, 16]}>
                      <Col xs={24} sm={12}>
                        <Form.Item name="dateOfBirth" label="Date Of Birth">
                          <Input disabled={modal1Visible} />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item name="address1" label="Address 1">
                          <Input disabled={modal1Visible} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={[20,16]}>
                      <Col xs={24} sm={12}>
                        <Form.Item name="address2" label="Address 2">
                          <Input disabled={modal1Visible} />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item name="country" label="Country">
                          <Input disabled={modal1Visible} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={[20,16]}>
                      <Col xs={24} sm={12}>
                        <Form.Item name="city" label="City">
                          <Input disabled={modal1Visible} />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item name="state" label="State">
                          <Input disabled={modal1Visible} />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Col span={24} style={{ textAlign: "right" }}>
                      <Button
                        className="button-style"
                        htmlType="submit"
                        // onClick={onFinish}
                        // loading={loading}
                      >
                        Update
                      </Button>
                    </Col>
                  </Form>
                </div>
              </Card>
            )}
            {profileSteps === 2 && (
              <div id="history" className="mt-3">
                <Card className="p-3">
                  <Typography className="mb-2" style={{ fontSize: "20px" }}>
                    Order History
                  </Typography>
                  <Table
                    scroll={{ x: true }}
                    dataSource={orders}
                    columns={columns}
                  />
                </Card>
              </div>
            )}

            {profileSteps === 3 && (
              <div id="security" className="mt-3 mb-5">
                <Card className="p-3">
                  <Typography style={{ fontSize: "20px" }}>
                    Account Security
                  </Typography>
                  <div>
                  <Typography className="mt-3">
                    Two step verification
                  </Typography>
                
                    <Switch></Switch>
                   </div> 
               
                  <Button
                      onClick={() => handleDeleteAccount()}
                      className="btn-danger mt-2"
                    >
                      Colse Account
                    </Button>
                </Card>
              </div>
            )}
          </Col>
          <DeleteConfirmModal
            setNewValu={setNewValu}
            deleteConfirmVisible={deleteConfirmVisible}
            setDeleteConfirmVisible={setDeleteConfirmVisible}
            onFinish={deleteUserConfirm}
          />
          <ViewOrderDetails
            itemsDetailsModal={itemsDetailsModal}
            setItemsDetailsModal={setItemsDetailsModal}
            itemDetails={itemDetails}
          />
        </Row>
      </div>
    </Spin>
  );
};

export default UserProfile;
