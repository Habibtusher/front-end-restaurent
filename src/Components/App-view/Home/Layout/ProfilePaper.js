import { Avatar, Card, Dropdown, Image, Menu } from 'antd';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const ProfilePaper = ({User,userProfile}) => {
    const history= useHistory()
    const handleLogout =()=>{
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        history.push("")
    }
    console.log(userProfile?.isAdmin);
    const item = userProfile?.isAdmin ? [
      {
        key: '1',
        label: (
          <Link  to="/app/user/profile">
            View Profile
          </Link>
        ),
      },
      {
        key: '2',
        label: (
          <Link  to="/app/admin/dashboard">
            Dashboard
          </Link>
        ),
      },
      {
        key: '3',
        label: (
          <Link onClick={()=>{handleLogout()}}>
            Logout
          </Link>
        ),
      },
    ] 
    :
    [
      {
        key: '1',
        label: (
          <Link  to="/app/user/profile">
            View Profile
          </Link>
        ),
      },
      {
        key: '3',
        label: (
          <Link onClick={()=>{handleLogout()}}>
            Logout
          </Link>
        ),
      },
    ]
    const menu = (
        <Menu
          items={item}
        />
      );
   
    return (
        <div>
          
            <Dropdown overlay={menu} placement="bottom">
            <div className="nav-item ml-2">
                <Avatar
                 size={35}
                  className="avater"
                  src={
                    <Image
                    className=''
                      preview={false}
                      src= {userProfile?.photo ? userProfile?.photo: "https://joeschmoe.io/api/v1/random"}
                     
                    />
                  }
                />
              </div>
      </Dropdown>
           
        </div>
    );
};

export default ProfilePaper;