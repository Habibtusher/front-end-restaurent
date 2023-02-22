import {
  DeleteOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Image,
  Input,
  message,
  Modal,
  Select,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddFoodModal.css";
import { create } from "../../../../Api/CommonService";
import { insert_food } from "../../../../Api/ApiConstant";
import { toast } from "react-toastify";
const { Option } = Select;
const AddFoodModal = ({
  showModal,
  setShowModal,
  getAllFood,
  singleFood,
  status,
}) => {
  const [form] = Form.useForm();
  const [logoPreview, setLogoPreview] = useState();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    const discount_price =
      values.price - (values.price * values.discount_percent) / 100;
    console.log(discount_price);
    const value = {
      id: singleFood ? singleFood._id : "",
      name: values.name,
      category: values.category,
      image: logoPreview,
      price: values.price,
      discountPrice: discount_price,
      discountPercent: values.discount_percent,
      ratting: 0,
    };
   
    const { data } = await create(insert_food, value);
    if (data.status === "success") {
      toast.success(data.message);

      getAllFood();
    }
    setLogoPreview()
    form.resetFields();
    setShowModal(false);
  };

  useEffect(()=>{
   
    if(singleFood){
      form.setFieldsValue({
        name:singleFood.name,
        category: singleFood.category,
        price:singleFood.price,
        discount_percent:singleFood.discountPercent,
       
      })
      setLogoPreview(singleFood.image)
    }
  },[singleFood])
  const uploadImage = async (options) => {
    setLoading(true);
    const { file } = options;
    console.log(file);
    const imageData = new FormData();
    imageData.set("key", "ac8d9f66a12ed78ebde2e2558428a077");
    imageData.append("image", file);
    try {
      const { data } = await axios.post(
        "https://api.imgbb.com/1/upload",
        imageData
      );
      if (data.success === true) {
        setLogoPreview(data.data.display_url);
        setLoading(false);
      }
      console.log(data.data.display_url);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Modal
        title="Add Food"
        style={{
          top: 20,
        }}
        visible={showModal}
        onCancel={() => {
          setLogoPreview()
          form.resetFields();
         setShowModal(false) 
        }}
        footer={null}
      >
        <div className="d-flex mt-3 uploader">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            customRequest={uploadImage}
          >
            {logoPreview ? (
              <Image
                src={logoPreview ? logoPreview : ""}
                alt="avatar"
                style={{ width: "100%" }}
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Add</div>
              </div>
            )}
          </Upload>
          <Button
            className="mt-4"
            style={{
              marginLeft: "20px",
              backgroundColor: "#95A7C5",
              borderRadius: "5px",
            }}
            icon={
              <DeleteOutlined
                style={{ fontSize: "20px", color: "#ffffff" }}
                // onClick={() => deleteProfileImage()}
              />
            }
          ></Button>
        </div>
        <Form
          className="mt-3"
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[
              {
                required: true,
                message: "Please input your last name",
              },
            ]}
          >
            <Select defaultValue={null}>
              <Option value={null}>Select</Option>
              <Option value="Chicken Special">Chicken Special</Option>
              <Option value="Soup">Soup</Option>
              <Option value="Sub & Burger">Sub & Burger</Option>
              <Option value="Combo Pack">Combo Pack</Option>
              <Option value="Noodles & Pasta">Noodles & Pasta</Option>
              <Option value="Pizza & Sandwich">Pizza & Sandwich</Option>
              <Option value="Rice Item">Rice Item</Option>
              <Option value="Plater">Plater</Option>
              <Option value="Drinks & Dessert">Drinks & Dessert</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              {
                required: true,
                message: "Please input peice",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="discount_percent" label="Discount Percent">
            <Input />
          </Form.Item>

          <div style={{ textAlign: "right" }}>
            <Button
              style={{ marginRight: "10px" }}
              onClick={() => {
                setLogoPreview()
                form.resetFields()
                 setShowModal(false)
              }}
            >
              {" "}
              Cancel
            </Button>
            <Button htmlType="summit" className="button-style">
              {status === "edit" ? "Update" : "Add"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AddFoodModal;
