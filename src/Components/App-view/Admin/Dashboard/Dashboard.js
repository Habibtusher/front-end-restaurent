import { Col, Row } from 'antd';
import React, { useState } from 'react';
import Adminsidebar from '../AdminSidebar/Adminsidebar';
import AllFoods from '../AllFoods/AllFoods';

const Dashboard = ({show,setShow}) => {
    const [current, setCurrent] = useState("1");
    return (
        <div>
          <Row >
            <Col span={3}> <Adminsidebar current={current} setCurrent={setCurrent}  setShow={setShow} show={show}/></Col>
            <Col span={20}> 
            {
                current == 1 && <AllFoods/>
            }
            </Col>
          </Row>
         
      
        </div>
    );
};

export default Dashboard;