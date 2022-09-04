import React, { useEffect, useState } from "react";
import { Button, Drawer, Menu, Space } from "antd";
import { RiDashboardFill } from "react-icons/ri";
import { AiOutlineMenu } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { MdOutlineCategory } from "react-icons/md";
import { GiCrossedBones, GiForkKnifeSpoon } from "react-icons/gi";
import {
  ProSidebar,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";

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
  getItem("Menu", "Menu", <GiForkKnifeSpoon />, [
    getItem("All Item", ""),
    getItem("Chicken Special", "Chicken Special"),
    getItem("Soup", "Soup"),
    getItem("Sub & Burger", "Sub & Burger"),
    getItem("Combo Pack", "Combo Pack"),
    getItem("Noodles & Pasta", "Noodles & Pasta"),
    getItem("Pizza & Sandwich", "Pizza & Sandwich"),
    getItem("Rice Item", "Rice Item"),
    getItem("Plater", "Plater"),
    getItem("Drinks & Dessert", "Drinks & Dessert"),
  ])
  ,
  // getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
  //   getItem("Option 5", "5"),
  //   getItem("Option 6", "6"),
  //   getItem("Submenu", "sub3", null, [
  //     getItem("Option 7", "7"),
  //     getItem("Option 8", "8"),
  //   ]),
  // ]),
  getItem("Navigation Three", "sub4", <SettingOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12"),
  ]),
];
const Sidenav = ({setShow ,show,setFilterCategory}) => {
  const [visibleSidebar, setVisibleSidebar] = useState(false);
  const User = JSON.parse(localStorage.getItem("user"));
  const [current, setCurrent] = useState("1");

  const onClick = (e) => {
    console.log("click ", e);
    setFilterCategory(e.key)
    setCurrent(e.key);
  };

  const [visible, setVisible] = useState(true);
  const [placement, setPlacement] = useState('left');

  const showDrawer = () => {
    setShow(true);
  };

  const onChange = (e) => {
    setPlacement(e.target.value);
  };

  const onClose = () => {
    setShow(false);
  };
  useEffect(() =>{
    // const User = JSON.parse(localStorage.getItem("show"));
    // console.log(User);
  })
  return (
    <div>
      <div className="main-sidebar">
      <Menu
        onClick={onClick}
        defaultOpenKeys={["Menu"]}
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
        extra={
          <Space>
            {/* <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button> */}
          </Space>
        }
      >
        <div className="p-3">
        <div className="d-flex justify-content-between p-2" style={{backgroundColor:"#282d32"}}>
        <img
            style={{ width: "80px" }}
            src="https://i.ibb.co/hFTdzyM/received-928227521113452.png"
            alt="received-928227521113452"
            border="0"
          />
           <GiCrossedBones onClick={()=>onClose()} className="drawer-cross-icon"/>
        </div>
       
      <Menu
        onClick={onClick}
       
        defaultOpenKeys={["food"]}
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

export default Sidenav;
