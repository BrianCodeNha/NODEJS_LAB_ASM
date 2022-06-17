import React, { useEffect, useState } from "react";
import { Button, InputGroup, Modal } from "react-bootstrap";
import axios from "axios";
import { FadeTransform } from "react-animation-components";
import { Link } from "react-router-dom";
import { fetchVeDo } from "../Redux/ActionCreator";

function QuanLyVeDo(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [producer, setProducer] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [veDoList, setVeDoList] = useState([]);  
  console.log("🚀 ~ file: QuanLyVeDo.js ~ line 18 ~ QuanLyVeDo ~ veDoList", veDoList)

  // chi tiet ve do
  useEffect(() =>{
    setLoading(true);
    if (props.veDoList != null){
      setVeDoList(props.veDoList);
      setLoading(false);
    }
  },[props.veDoList])

  const veDoDetails = veDoList.map((staff) => (
    <div
      key={staff._id}
      className="outer col-12 col-md-12 col-lg-6 justify-content-center"
      style={{ padding: "20px" }}
    >
      <div className="item">
        <FadeTransform
          in
          transformProps={{
            exitTransform: "scale(0.5) translateY(-50%)",
          }}
        >
          <Link exact to={`/vedo/${staff._id}`}>
            <div
              style={{
                backgroundColor: "#EBEBEB",
                borderRadius: "25px",
                height: "auto",
                width: "100%",
                textAlign: "left",
                padding: "25px",
              }}
            >
              <strong>Đài: </strong> {staff.producer + " "}
              <strong>- Mã Đài: </strong> {staff.producerId + " "}
              <strong> Ngày xổ số: </strong> {staff.date.split('-').reverse().join('-')}
              <br />
              <h4>Cơ Cấu Giải Thưởng </h4>
              <div className="row" style={{border: '1px solid'}}>
                <div className="col-4">
                  <strong>Giải Đặc Biệt: </strong>
                </div>
                <div className="col-8">{staff.prize.rewardNumbers.giaiDB}</div>
              </div>
              <div className="row" style={{border: '1px solid'}}>
                <div className="col-4">
                  <strong>Giải Nhất: </strong>
                </div>
                <div className="col-8">{staff.prize.rewardNumbers.giaiNhat}</div>
              </div>
              <div className="row" style={{border: '1px solid'}}>
                <div className="col-4">
                  <strong>Giải Nhì: </strong>
                </div>
                <div className="col-8">{staff.prize.rewardNumbers.giaiNhi}</div>
              </div>
              <div className="row" style={{border: '1px solid'}}>
                <div className="col-4">
                  <strong>Giải Ba: </strong>
                </div>
                <div className="col-8">{staff.prize.rewardNumbers.giaiBa.giaiBa1 + " - " + staff.prize.rewardNumbers.giaiBa.giaiBa2}</div>
              </div>
              <div className="row" style={{border: '1px solid'}}>
                <div className="col-4">
                  <strong>Giải Tư: </strong>
                </div>
                <div className="col-8">{staff.prize.rewardNumbers.giaiTu.giaiTu1 + " - " + staff.prize.rewardNumbers.giaiTu.giaiTu2 + " - " + staff.prize.rewardNumbers.giaiTu.giaiTu3 + " - " + staff.prize.rewardNumbers.giaiTu.giaiTu4 + " - " + staff.prize.rewardNumbers.giaiTu.giaiTu5 + " - " + staff.prize.rewardNumbers.giaiTu.giaiTu6 + " - " + staff.prize.rewardNumbers.giaiTu.giaiTu7}</div>
              </div>
              <div className="row" style={{border: '1px solid'}}>
                <div className="col-4">
                  <strong>Giải Năm: </strong>
                </div>
                <div className="col-8">{staff.prize.rewardNumbers.giaiNam}</div>
              </div>
              <div className="row" style={{border: '1px solid'}}>
                <div className="col-4">
                  <strong>Giải Sáu: </strong>
                </div>
                <div className="col-8">{staff.prize.rewardNumbers.giaiSau.giaiSau1 + " - " + staff.prize.rewardNumbers.giaiSau.giaiSau2  + " - " + staff.prize.rewardNumbers.giaiSau.giaiSau3}</div>
              </div>
              <div className="row" style={{border: '1px solid'}}>
                <div className="col-4">
                  <strong>Giải Bảy: </strong>
                </div>
                <div className="col-8">{staff.prize.rewardNumbers.giaiBay}</div>
              </div>
              <div className="row" style={{border: '1px solid'}}>
                <div className="col-4">
                  <strong>Giải Tám: </strong>
                </div>
                <div className="col-8">{staff.prize.rewardNumbers.giaiTam}</div>
              </div>




            </div>
          </Link>
        </FadeTransform>
        <div className="row">
          <button
            onClick={() => props.deleteEmployee(staff._id)}
            className="col info"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ));

  // render ra giao dien
  return (
    <div>
      <div
        className="headerBar"
        style={{
          backgroundColor: "#F0F0F0",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div className="header" style={{ padding: "20px" }}>
          <span style={{ fontSize: "30px", textAlign: "center" }}>
            Quản Lý Thông Tin Vé Dò
          </span>{" "}
          <br />
          <Button variant="primary" onClick={handleShow}>
            Thêm Thông tin vé dò
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Thêm Vé Dò Mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form
                action="http://localhost:5000/admin/checkticket"
                method="post"
              >
                <label htmlFor="producer" className="row container">
                  Đài xổ số:
                  <select
                    name="producer"
                    onChange={(e) => setProducer(e.target.value)}
                  >
                    <option>Chọn nhà đài xổ số</option>
                    <option>An Giang</option>
                    <option>Vĩnh Long</option>
                    <option>Bình Dương</option>
                    <option>Bình Thuận</option>
                    <option>Tây Ninh</option>
                  </select>
                </label>
                <label htmlFor="producerId" className="row container">
                  Mã Đài xổ số:
                  <input
                    type="text"
                    editable="false"
                    name="producerId"
                    value={
                      producer === "An Giang"
                        ? "XSAG - AG-6K2"
                        : producer === "Tây Ninh"
                        ? "XSTN - 6K2"
                        : producer === "Bình Thuận"
                        ? "XSBTH - 6K2"
                        : producer === "Vĩnh Long"
                        ? "XSVL - 43VL23"
                        : producer === "Bình Dương"
                        ? "XSBD - 06K23"
                        : "vui lòng chọn đài xổ số"
                    }
                  />
                </label>
                <label htmlFor="date" className="row container">
                  Ngày xổ số:
                  <input type="date" name="date" />
                </label>
                <label htmlFor="giaiDB" className="row container">
                  Các Số trúsng giải thưởng:
                  <input
                    placeholder="giải đặc biệt"
                    type="text"
                    name="giaiDB"
                    id="giaiDB"
                    maxlength={6}
                    margin="2px"
                  />
                  <input
                    placeholder="giải nhất"
                    type="text"
                    name="giaiNhat"
                    id="giaiNhat"
                    maxlength={5}
                    margin="2px"
                  />
                  <input
                    placeholder="giải nhì"
                    type="text"
                    name="giaiNhi"
                    id="giaiNhi"
                    maxlength={5}
                    margin="2px"
                  />
                  <InputGroup style={{ padding: "10px" }}>
                    <input
                      placeholder="giải ba 1"
                      type="text"
                      name="giaiBa1"
                      id="giaiBa1"
                      maxlength={5}
                    />
                    <input
                      placeholder="giải ba 2"
                      type="text"
                      name="giaiBa2"
                      id="giaiBa2"
                      maxlength={5}
                    />
                  </InputGroup>
                  <InputGroup style={{ padding: "10px" }}>
                    <input
                      placeholder="giải tư 1"
                      type="text"
                      name="giaiTu1"
                      id="giaiTu1"
                      maxlength={5}
                    />
                    <input
                      placeholder="giải tư 2"
                      type="text"
                      name="giaiTu2"
                      id="giaiTu2"
                      maxlength={5}
                    />
                  </InputGroup>
                  <InputGroup style={{ padding: "10px" }}>
                    <input
                      placeholder="giải tư 3"
                      type="text"
                      name="giaiTu3"
                      id="giaiTu3"
                      maxlength={5}
                    />
                    <input
                      placeholder="giải tư 4"
                      type="text"
                      name="giaiTu4"
                      id="giaiTu4"
                      maxlength={5}
                    />

                    <input
                      placeholder="giải tư 5"
                      type="text"
                      name="giaiTu5"
                      id="giaiTu5"
                      maxlength={5}
                    />
                    <input
                      placeholder="giải tư 6"
                      type="text"
                      name="giaiTu6"
                      id="giaiTu6"
                      maxlength={5}
                    />
                    <input
                      placeholder="giải tư 7"
                      type="text"
                      name="giaiTu7"
                      id="giaiTu7"
                      maxlength={5}
                    />
                  </InputGroup>
                  <InputGroup style={{ padding: "10px" }}></InputGroup>
                  <input
                    placeholder="giải năm"
                    type="text"
                    name="giaiNam"
                    id="giaiNam"
                    maxlength={4}
                  />
                  <InputGroup style={{ padding: "10px" }}>
                    <input
                      placeholder="giải sáu 1"
                      type="text"
                      name="giaiSau1"
                      id="giaiSau1"
                      maxlength={4}
                    />
                    <input
                      placeholder="giải sáu 2"
                      type="text"
                      name="giaiSau2"
                      id="giaiSau2"
                      maxlength={4}
                    />
                    <input
                      placeholder="giải sáu 3"
                      type="text"
                      name="giaiSau3"
                      id="giaiSau3"
                      maxlength={4}
                    />
                  </InputGroup>
                  <InputGroup style={{ padding: "10px" }}>
                    <input
                      placeholder="giải bảy"
                      type="text"
                      name="giaiBay"
                      id="giaiBay"
                      maxlength={3}
                    />
                    <input
                      placeholder="giải tám"
                      type="text"
                      name="giaiTam"
                      id="giaiTam"
                      maxlength={2}
                    />
                  </InputGroup>
                </label>
                <button type="submit">update</button>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>

      <div className="row cod-flex p-2">{veDoDetails}</div>
    </div>
  );
}

export default QuanLyVeDo;
