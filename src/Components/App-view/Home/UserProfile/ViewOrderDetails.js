import { Image, Modal, Table, Typography } from "antd";
import React from "react";
import "./userProfile.css"
const ViewOrderDetails = ({
  itemsDetailsModal,
  setItemsDetailsModal,
  itemDetails,
}) => {
  console.log(itemDetails);
  const columns = [
    {
      title: (
        <Typography className="dashboard-table-header">
          Name
        </Typography>
      ),
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return (
          <div className="d-flex align-items-center">
            <Image className="cart-item-image" src={record.image} />
            <Typography>{record.name}</Typography>
          </div>
        );
      },
    },
    {
      title: (
        <Typography className="dashboard-table-header">Price</Typography>
      ),
      dataIndex: "price",
      key: "price",
      render: (_, record) => {
        return (
          <div className="d-flex align-items-center">
            <Typography>৳{record.price}</Typography>
          </div>
        );
      },
    },
    {
      title: <Typography className="dashboard-table-header">Quantity</Typography>,
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => {
        return (
          <div className="d-flex align-items-center">
            <Typography>{record.quantity}</Typography>
          </div>
        );
      },
    },
  
  ];
  return (
    <Modal
      title="Items"
      centered
      visible={itemsDetailsModal}
      onOk={() => setItemsDetailsModal(false)}
      onCancel={() => setItemsDetailsModal(false)}
      footer={null}
    >
      <Table pagination={false} dataSource={itemDetails} columns={columns} />
    </Modal>
  );
};

export default ViewOrderDetails;
