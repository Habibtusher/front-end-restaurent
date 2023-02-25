import { Card, Col, Row, Space, Statistic } from "antd";
import React, { useState } from "react";
import { AiOutlineDollarCircle, AiOutlineShoppingCart, AiOutlineStock } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import Adminsidebar from "../AdminSidebar/Adminsidebar";
import AllFoods from "../AllFoods/AllFoods";
import Orders from "../Orders/Orders";

const Dashboard = ({ show, setShow }) => {
  const [current, setCurrent] = useState(0);
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
            <div className="p-4 mx-auto">
              <Row className="mt-3 mb-3" gutter={[30, 16]}>
                <Col md={6} sm={12}>
                  <Card>
                    <Space direction="horizontal" >
                    <AiOutlineShoppingCart className="dashboard-icons"/>
                    <Statistic title="Orders" value="120"></Statistic>
                    </Space>
                  </Card>
                </Col>
                <Col md={6} sm={12}>
                  <Card>
                  <Space direction="horizontal" >
                    <AiOutlineStock className="dashboard-icons"/>
                  <Statistic title="Inventory" value="1200"></Statistic>
                  </Space>
                  </Card>
                  {/* <div className="orders-div2 order-type"></div> */}
                </Col>
                <Col md={6} sm={12}>
                  <Card>
                  <Space direction="horizontal" >
                    <FiUsers className="dashboard-icons"/>
                  <Statistic title=" Customer" value="100"></Statistic>
                   </Space>
                  </Card>
                </Col>
                <Col md={6} sm={12}>
                  <Card>
                    <Space direction="horizontal">
                    <AiOutlineDollarCircle className="dashboard-icons"/>
                  <Statistic title="Revenue" value="120000"></Statistic>
                  </Space>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
          {current == 1 && <AllFoods />}
          {current == 2 && <Orders />}
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
