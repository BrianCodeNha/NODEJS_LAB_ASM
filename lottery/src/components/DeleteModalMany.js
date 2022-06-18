import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function DeleteModalMany({setDeleteList, deleteList, deleteSelectedItem }) {
  //modal xac nhan delete
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div>
    <button
    className="btn-danger mx-20"
    onClick={handleShow}
  >
    Delete selected items
  </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xoá</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xoá vé số được chọn?
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
               deleteSelectedItem(deleteList);
              return setDeleteList([]);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteModalMany;
