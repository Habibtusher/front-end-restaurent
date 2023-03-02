import { Card, Col, Row, Space, Statistic, Table, Typography } from "antd";
import React, { useState } from "react";
import { AiOutlineDollarCircle, AiOutlineShoppingCart, AiOutlineStock } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import Adminsidebar from "../AdminSidebar/Adminsidebar";
import AllFoods from "../AllFoods/AllFoods";
import Orders from "../Orders/Orders";

const Dashboard = ({ show, setShow }) => {
  const [current, setCurrent] = useState(0);
  const [orders, setOrders] = useState();
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
            // onClick={() => {
            //   handleViewDetails(record._id);
            // }}
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
    <div className="dashboard-admin">
      <Row>
        <Col xl={4} lg={0}>
          {" "}
          <Adminsidebar
            current={current}
            setCurrent={setCurrent}
            setShow={setShow}
            show={show}
          />
        </Col>
        <Col className="dashboard-right-side" xl={20} lg={24}>
          {current == 0 && (
            <>
            <div className="p-4 ">
              <Row className="mt-3 mb-3" gutter={[30, 16]}>
                <Col  className="w-100" md={6} sm={12}>
                  <Card className="text-center bg-transparent border border-info rounded-3">
                    <Space direction="horizontal" >
                    <AiOutlineShoppingCart className="dashboard-icons"/>
                    <Statistic title="Orders" value="120"></Statistic>
                    </Space>
                  </Card>
                </Col>
                <Col  className="w-100" md={6} sm={12}>
                  <Card  className="text-center bg-transparent border border-info rounded-3">
                  <Space direction="horizontal" >
                    <AiOutlineStock className="dashboard-icons"/>
                  <Statistic title="Inventory" value="1200"></Statistic>
                  </Space>
                  </Card>
                  {/* <div className="orders-div2 order-type"></div> */}
                </Col>
                <Col  className="w-100" md={6} sm={12}>
                  <Card  className="text-center bg-transparent border border-info rounded-3">
                  <Space direction="horizontal" >
                    <FiUsers className="dashboard-icons"/>
                  <Statistic title=" Customer" value="100"></Statistic>
                   </Space>
                  </Card>
                </Col>
                <Col className="w-100" md={6} sm={12}>
                  <Card  className="text-center bg-transparent border border-info rounded-3">
                    <Space direction="horizontal">
                    <AiOutlineDollarCircle className="dashboard-icons"/>
                  <Statistic title="Revenue" value="120000"></Statistic>
                  </Space>
                  </Card>
                </Col>
              </Row>
            </div>
            <Row className="p-4" gutter={[0, 16]}>
              <Col md={12} sm={24} >
                <h3 className="text-secondary fs-4">Last 5 Orders</h3>
                <Table
                    scroll={{ x: true }}
                    dataSource={orders}
                    columns={columns}
                  />
              </Col>
              <Col md={12} sm={24} >
              <h3 className="text-secondary fs-4">Revenue</h3>
                
              </Col>
            </Row>
            </>
          )}
          {current == 1 && <AllFoods />}
          {current == 2 && <Orders />}
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
