import { Col, Row } from "antd";
import React, { useState } from "react";
import Adminsidebar from "../AdminSidebar/Adminsidebar";
import AllFoods from "../AllFoods/AllFoods";
import Orders from "../Orders/Orders";

const Dashboard = ({ show, setShow }) => {
  const [current, setCurrent] = useState("1");
  return (
    <div>
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
          {current == 1 && <AllFoods />}
          {current == 2 && <Orders />}
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
