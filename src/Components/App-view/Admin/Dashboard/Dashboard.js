import { Col, Row } from 'antd';
import React, { useState } from 'react';
import Adminsidebar from '../AdminSidebar/Adminsidebar';
import AllFoods from '../AllFoods/AllFoods';

const Dashboard = ({show,setShow}) => {
    const [current, setCurrent] = useState("1");
    return (
        <div>
          <Row >
            <Col xl={3} lg={0}> <Adminsidebar current={current} setCurrent={setCurrent}  setShow={setShow} show={show}/></Col>
            <Col xl={20} lg={24}> 
            {
                current == 1 && <AllFoods/>
            }
            </Col>
          </Row>
         
      
        </div>
    );
};

export default Dashboard;