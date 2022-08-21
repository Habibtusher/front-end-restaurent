import React from "react";
import {
  Anchor,
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Typography,
} from "antd";
const UpdateUserModal = ({ userProfile, modal1Visible, setModal1Visible }) => {
  const [form] = Form.useForm();
  const onFinish = async () => {};
  form.setFieldsValue({
    firstName: userProfile?.firstName,
    lastName: userProfile?.lastName,
    phone: userProfile?.phone,
  });
  return (
    <div>
      <Modal
        title="Update Profile"
        visible={modal1Visible}
        onCancel={() => setModal1Visible(false)}
        footer={null}
        centered
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              {
                required: true,
                message: "Please input your first name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              {
                required: true,
                message: "Please input your last name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              {
                required: true,
                message: "Please input your last name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="address1" label="Address 1">
            <Input />
          </Form.Item>
          <Form.Item name="address2" label="Address 2">
            <Input />
          </Form.Item>

          <Form.Item name="country" label="Country">
            <Input />
          </Form.Item>
          <Form.Item name="city" label="City">
            <Input />
          </Form.Item>
          <Form.Item name="city" label="City">
            <Input />
          </Form.Item>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button style={{marginRight:"6px"}} onClick={() => setModal1Visible(false)}>Cancel</Button>
            <Button
            className="button-style"
              htmlType="submit"
              // onClick={onFinish}
              // loading={loading}
            >
              Update
            </Button>
          </Col>
        </Form>
      </Modal>
    </div>
  );
};

export default UpdateUserModal;
