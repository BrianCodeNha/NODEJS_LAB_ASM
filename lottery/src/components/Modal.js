import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";
import { Label, Input } from "reactstrap";


export default function AddEmployee(props) {
  // on off modal
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
  };
  

  // employee object
  const initialState = {   
    producer: "",
    date: "",
    number: "",
    userId: "629c776c105e641c517df434",
  };

  const [newVeSo, setNewVeSo] = useState(initialState);

  const [isSubmit, SetIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({ name: "" });

  //add form data to state

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewVeSo({ ...newVeSo, [name]: value });
    console.log(newVeSo);
  };

  // validate form

  const validate = (values) => {
    const errors = {};

    if (!values.producer) {
      errors.producer = "Yêu cầu nhập";
    } else if (values.producer.length < 3) {
      errors.producer = "Yêu cầu tối thiểu 2 ký tự";
    }

    if (!values.date) {
      errors.date = "Yêu cầu nhập";
    }   

    if (!values.number) {
      errors.number = "Yêu cầu nhập";
    }  

    return errors;
  };

  // submit new Employee function

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(newVeSo));
    SetIsSubmit(true);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      
      handleClose();           
      console.log("🚀 ~ file: Modal.js ~ line 70 ~ handleSubmit ~ newVeSo", newVeSo)
      props.postStaff(newVeSo);
      setNewVeSo(initialState);
      
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <i className="fa fa-plus" /> Thêm Vé Số
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Vé Số</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="row">
              <Label htmlFor="name" md={4}>
                Nhà Đài
              </Label>
              <Col md={7}>
                <Input
                  onChange={handleChange}
                  value={newVeSo.producer}
                  type="text"
                  id="producer"
                  name="producer"
                  placeholder="Đài Xổ Số"
                />
                <div style={{ color: "#dc3545" }}>{formErrors.producer}</div>
              </Col>
            </div>

            <div className="row">
              <Label htmlFor="date" md={4}>
                Ngày xổ số
              </Label>
              <Col md={7}>
                <Input
                  onChange={handleChange}
                  value={newVeSo.date}
                  type="date"
                  id="doB"
                  name="date"
                  placeholder=""
                />                
                <div style={{ color: "#dc3545" }}>{formErrors.date}</div>
              </Col>
            </div>           
           
            <div className="row">
              <Label htmlFor="number" md={4}>
                Số
              </Label>             
              <Col md={7}>
                <Input
                  value={newVeSo.number}
                  onChange={handleChange}
                  type="number"
                  id="number"
                  name="number"
                  placeholder="số dùng để dò"
                />
                <div style={{ color: "#dc3545" }}>{formErrors.number}</div>              
                </Col>
            </div>                       
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setNewVeSo(initialState)}>
              Reset
            </Button>
            <Button variant="primary" type="submit">
              Thêm
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
