import { FieldTimeOutlined } from "@ant-design/icons";
import { Button, Image, message, Spin, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { delete_food, get_all_food } from "../../../../Api/ApiConstant";
import { deleteItem, getAllData } from "../../../../Api/CommonService";
import AddFoodModal from "../AddFoodModal/AddFoodModal";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import DeleteConfirmModal from "../../../CommonModal/DeleteConfirmModal";
const AllFoods = () => {
  const [showModal, setShowModal] = useState(false);
  const [allFoods, setAllFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectId, setSelectId] = useState();
  const [singleFood, setSingleFood] = useState();
  const [status, setStatus] = useState("");
  const getAllFood = async () => {
    setLoading(true);
    const { data } = await getAllData(get_all_food);
    setAllFoods(data.data);
    setLoading(false);
  };
  useEffect(() => {
    getAllFood();
  }, []);

  const deleteFood = async () => {
    const value = {
      id: selectId,
    };
    const { data } = await deleteItem(delete_food, value);
    console.log(data);
    if (data.status === "success") {
      message.success(data.message);
    }
    getAllFood();
    setDeleteModal(false);
  };
  const handleDelete = async (id) => {
    setSelectId(id);
    setDeleteModal(true);
  };
  const handleEdit = (id) => {
    const editFood = allFoods.find((e) => e._id === id);
    setStatus("edit");
    setSingleFood(editFood);
    setShowModal(true);
  };
  const columns = [
    {
      title: <Typography className="dashboard-table-header">Image</Typography>,
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return (         
            <Image className="dashboard-allfood-img"  src={record.image} />      
        );
      },
    },
    {
      title: <Typography className="dashboard-table-header">Name</Typography>,
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return (
          <div className="d-flex align-items-center">
            <Typography>{record.name}</Typography>
          </div>
        );
      },
    },
    {
      title: (
        <Typography className="dashboard-table-header">Category</Typography>
      ),
      dataIndex: "category",
      key: "category",
    },
    {
      title: <Typography className="dashboard-table-header">Price</Typography>,
      dataIndex: "price",
      key: "price",
    },
    {
      title: (
        <Typography className="dashboard-table-header">
          Discount Price
        </Typography>
      ),
      dataIndex: "discountPrice",
      key: "discountPrice",
    },
    {
      title: (
        <Typography className="dashboard-table-header">
          Discount Percent
        </Typography>
      ),
      dataIndex: "discountPercent",
      key: "discountPercent",
      render: (_, record) => {
        return <Typography>{record.discountPercent} %</Typography>;
      },
    },
    {
      title: <Typography className="dashboard-table-header">Action</Typography>,
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <div className="d-flex align-items-center all-food">
            <FiEdit
              onClick={() => handleEdit(record._id)}
              className="edit-icon"
            />
            <RiDeleteBin6Line
              onClick={() => handleDelete(record._id)}
              className="delete-icon"
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-2">
      <div style={{ textAlign: "right" }} className="mb-3">
        {" "}
        <Button
          onClick={() => {
            setShowModal(true);
            setStatus("add");
          }}
          className="button-style"
        >
          Add new
        </Button>
      </div>
      <Spin spinning={loading} tip="Loading...">
        <Table scroll={{ x: true }} dataSource={allFoods} columns={columns} />
      </Spin>
      <AddFoodModal
        status={status}
        singleFood={singleFood}
        getAllFood={getAllFood}
        setShowModal={setShowModal}
        showModal={showModal}
      />
      <DeleteConfirmModal
        deleteConfirmVisible={deleteModal}
        setDeleteConfirmVisible={setDeleteModal}
        onFinish={deleteFood}
      />
    </div>
  );
};

export default AllFoods;
