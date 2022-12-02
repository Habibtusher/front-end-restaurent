import React, { useState } from "react";

import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { RiDashboardFill } from "react-icons/ri";
import { AiOutlineMenu } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { MdFoodBank, MdOutlineCategory } from "react-icons/md";
import { Drawer, Menu, Space } from "antd";
import { GiCrossedBones, GiForkKnifeSpoon } from "react-icons/gi";
import { Link } from "react-router-dom";

function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem("Dashboard", "Dashboard", <GiForkKnifeSpoon />, [
      getItem("All Foods", "1"),
      getItem("Orders", "2"),
      getItem("Add Admin", "3"),
    //   getItem("A", "Soup"),
    //   getItem("Sub & Burger", "Sub & Burger"),
    //   getItem("Combo Pack", "Combo Pack"),
     
    ]),
    // getItem("Navigation Three", "sub4", <SettingOutlined />, [
    //   getItem("Option 9", "9"),
    //   getItem("Option 10", "10"),
    //   getItem("Option 11", "11"),
    //   getItem("Option 12", "12"),
    // ]),
  ];

const Adminsidebar = ({ show, setShow ,current, setCurrent}) => {
  const [placement, setPlacement] = useState("left");
 
 
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const onClose = () => {
    setShow(false);
  };
  return (
    <div>
      <div className="main-sidebar">      
        <Menu
          onClick={onClick}
          defaultOpenKeys={["Dashboard"]}
          selectedKeys={[current]}
          mode="inline"
          items={items}
        />
      </div>
      <div className="drawer-sidebar">
        <Drawer
          placement={placement}
          width={260}
          closable={false}
          visible={show}
        >
          <div className="p-3">
            <div
              className="d-flex justify-content-between p-2"
              style={{ backgroundColor: "#282d32" }}
            >
              <img
                style={{ width: "80px" }}
                src="https://i.ibb.co/hFTdzyM/received-928227521113452.png"
                alt="received-928227521113452"
                border="0"
              />
              <GiCrossedBones
                onClick={() => onClose()}
                className="drawer-cross-icon"
              />
            </div>

            <Menu
              onClick={onClick}
              defaultOpenKeys={["Menu"]}
              selectedKeys={[current]}
              mode="inline"
              items={items}
            />
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default Adminsidebar;
