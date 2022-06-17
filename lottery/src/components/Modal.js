import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";
import { Label, Input } from "reactstrap";


export default function AddEmployee(props) {
  // on off modal
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  

  // employee object
  const initialState = {
    id: 0,
    name: "",
    doB: "",
    startDate: "",
    salaryScale: "",
    department: "Dept01",
    annualLeave: "",
    overTime: "",
    image: "/assets/images/alberto.png",
  };

  const [newEmployee, setNewEmployee] = useState(initialState);

  const [isSubmit, SetIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({ name: "" });

  //add form data to state

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewEmployee({ ...newEmployee, [name]: value });
    console.log(newEmployee);
  };

  // validate form

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Yêu cầu nhập";
    } else if (values.name.length < 3) {
      errors.name = "Yêu cầu tối thiểu 2 ký tự";
    }

    if (!values.doB) {
      errors.doB = "Yêu cầu nhập";
    }

    if (!values.department) {
      errors.department = "Yêu cầu nhập";
    }

    if (!values.salaryScale) {
      errors.salaryScale = "Yêu cầu nhập";
    }

    if (!values.annualLeave) {
      errors.annualLeave = "Yêu cầu nhập";
    }

    if (!values.overTime) {
      errors.overTime = "Yêu cầu nhập";
    }

    return errors;
  };

  // submit new Employee function

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(newEmployee));
    SetIsSubmit(true);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      
      handleClose();      
      console.log('id',props.staffList.length)
      setNewEmployee({ ...initialState, id: props.staffList.length });
      console.log(newEmployee)
      props.postStaff(newEmployee.id,newEmployee.name, newEmployee.doB, newEmployee.startDate, newEmployee.department, newEmployee.salaryScale, newEmployee.annualLeave, newEmployee.overTime,newEmployee.image
        
      );
      
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <i className="fa fa-plus" />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Nhân Viên</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="row">
              <Label htmlFor="name" md={4}>
                Tên
              </Label>
              <Col md={7}>
                <Input
                  onChange={handleChange}
                  value={newEmployee.name}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Họ và tên"
                />
                <div style={{ color: "#dc3545" }}>{formErrors.name}</div>
              </Col>
            </div>

            <div className="row">
              <Label htmlFor="doB" md={4}>
                Ngày Sinh
              </Label>
              <Col md={7}>
                <Input
                  onChange={handleChange}
                  value={newEmployee.doB}
                  type="date"
                  id="doB"
                  name="doB"
                  placeholder=""
                />
                <div style={{ color: "#dc3545" }}>{formErrors.doB}</div>
              </Col>
            </div>
            <div className="row">
              <Label htmlFor="startDate" md={4}>
                Ngày vào công ty
              </Label>
              <Col md={7}>
                <Input
                  onChange={handleChange}
                  value={newEmployee.startDate}
                  type="date"
                  id="startDate"
                  name="startDate"
                  placeholder=""
                />
                <div style={{ color: "#dc3545" }}>{formErrors.startDate}</div>
              </Col>
            </div>
            <div className="row">
              <Label htmlFor="department" md={4}>
                Phòng ban
              </Label>
              <Col md={7}>
                <select
                  value={newEmployee.department}
                  name="department"
                  id="department"
                  onChange={handleChange}
                  style={{ width: "100%", borderRadius: "3px" }}
                >
                  <option value='Dept01'>Sale</option>
                  <option value='Dept02'>HR</option>
                  <option value='Dept03'>Marketing</option>
                  <option value='Dept04'>IT</option>
                  <option value='Dept05'>Finance</option>
                </select>
                <div style={{ color: "#dc3545" }}>{formErrors.department}</div>
              </Col>
            </div>
            <div className="row">
              <Label htmlFor="salaryScale" md={4}>
                Hệ số lương
              </Label>
              <Col md={7}>
                <Input
                  value={newEmployee.salaryScale}
                  onChange={handleChange}
                  type="number"
                  id="salaryScale"
                  name="salaryScale"
                  placeholder=""
                />
                <div style={{ color: "#dc3545" }}>{formErrors.salaryScale}</div>
              </Col>
            </div>
            <div className="row">
              <Label htmlFor="annualLeave" md={4}>
                Ngày nghỉ còn lại
              </Label>
              <Col md={7}>
                <Input
                  value={newEmployee.annualLeave}
                  onChange={handleChange}
                  type="number"
                  id="annualLeave"
                  name="annualLeave"
                  placeholder=""
                />
                <div style={{ color: "#dc3545" }}>{formErrors.annualLeave}</div>
              </Col>
            </div>
            <div className="row">
              <Label htmlFor="overTime" md={4}>
                Số ngày đã làm thêm
              </Label>
              <Col md={7}>
                <Input
                  value={newEmployee.overTime}
                  onChange={handleChange}
                  type="number"
                  id="overTime"
                  name="overTime"
                  placeholder=""
                />
                <div style={{ color: "#dc3545" }}>{formErrors.overTime}</div>
              </Col>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
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
