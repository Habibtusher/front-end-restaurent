import { Button, Col, Modal, Typography } from "antd";
import React from "react";
import { ImWarning } from "react-icons/im";

const DeleteConfirmModal = ({
  deleteConfirmVisible,
  setDeleteConfirmVisible,
  onFinish,
  setNewValu
}) => {

  return (
    <div>
      <Modal
        title="Delete Confirm"
        style={{ top: 40 }}
        visible={deleteConfirmVisible}
        onCancel={() => setDeleteConfirmVisible(false)}
        footer={null}
      >
        <div className="d-flex">
          <ImWarning className="delete-icon" />
          <Typography className="delete-modal-text">Are you sure, want to delete your account?</Typography>
        </div>
        <Col className="mt-3" span={24} style={{ textAlign: "right" }}>
          <Button
            style={{ marginRight: "6px" }}
            onClick={() => setDeleteConfirmVisible(false)}
          >
            Keep
          </Button>
          <Button
            className="btn-danger"
            onClick={onFinish}
            // loading={loading}
          >
            Delete
          </Button>
        </Col>
      </Modal>
    </div>
  );
};

export default DeleteConfirmModal;
