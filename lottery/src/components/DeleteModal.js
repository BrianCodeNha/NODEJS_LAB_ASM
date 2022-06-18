import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function DeleteModal({ staff, deleteEmployee }) {
  //modal xac nhan delete
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div>
      <button onClick={handleShow} className="btn-danger my-1">
        Delete
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xoá</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xoá vé số này? <br />
          Đài: {staff.producer}  <br />
          Số: {staff.number} 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              return deleteEmployee(staff._id, staff.number, staff.producer);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteModal;
