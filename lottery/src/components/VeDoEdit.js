import React, { useState } from "react";
import dateFormat from 'dateformat'
import {Link} from 'react-router-dom'
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdb-react-ui-kit";
import {Loading} from './Loading'
import './Employee.css'
import { updateEmployee } from "../Redux/ActionCreator";
import { connect } from "react-redux";
import { InputGroup } from "react-bootstrap";

const mapDispatchToProps = (dispatch) => ({
  updateEmployee: (editId, Editedemployee) => dispatch(updateEmployee(editId, Editedemployee))
})

export function VeDoEdit(props) { //truyền data fetch từ server truyền vào props     

  const EmployeeDetail = () => {

    if (props.isLoading){
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      )
    } else if ( props.errorMess){
      return (
        <div className="container">
        <div className="row">
        <h4>{props.errorMess}</h4>
        </div>
        </div>
      )
    }else if (props.staff != null){     
    console.log("🚀 ~ file: VeDoEdit.js ~ line 35 ~ EmployeeDetail ~ props.staff", props.staff)

      let updateVeDo = {
        id: props.staff._id,
        name: props.staff.producer,
        date: props.staff.date,
        
      }


      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(updateVeDo)
      //  props.updateEmployee(updateVeDo.id, updateVeDo);
      }
      
      const handleChange = (e) => {
        const {name, value} = e.target;
       return updateVeDo = {...updateVeDo,[name]: value}       
      }
 
      return (
        <div className="staff row container">
        <MDBBreadcrumb>
            <MDBBreadcrumbItem>
              <Link to='/veso'>Quản Lý Vé Dò</Link>
            </MDBBreadcrumbItem>
            <MDBBreadcrumbItem active>{props.staff.producer}</MDBBreadcrumbItem>
          </MDBBreadcrumb>
          <div className="col-12 col-md-4 col-lg-3">
            
          </div>
          <div className="col-12 col-md-8 col-lg-9">         
          <p>          
          Đài xổ số: {props.staff.producer}<br />             
          Ngày xổ Số: {props.staff.date.split('-').reverse().join('-')}<br />             
          </p>
          <h3>KẾT QUẢ XỔ SỐ: {props.staff.result}</h3>
          <hr/>
           <h3>Cập nhật thông tin vé số</h3>
           <form className='p-2'>           
           <label htmlFor="producer" className="row container">Đài xổ số: 
           <input type='text' name='producer' placeholder={props.staff.producer}  onChange={(e) => handleChange(e)} />
           </label>
           <label htmlFor="producerId" className="row container">Mã Đài xổ số: 
           <input type='text' name='producerId' placeholder={props.staff.producerId} onChange={(e) => handleChange(e)} />
           </label>           
           <label htmlFor="date" className="row container">Ngày xổ số: {props.staff.date.split('-').reverse().join('-')}
           <input type='date' name='date'  onChange={(e) => handleChange(e)} />
           </label>     
           <br />
           <h4>Cơ Cấu Giải Thưởng</h4>   

           <label htmlFor="giaiDB" className="my-3" >
                  Giải Đặc Biệt: 
                  </label>
                  <input
                    placeholder={props.staff.prize.rewardNumbers.giaiDB}
                    type="text"                    
                    name="giaiDB"
                    id="giaiDB"
                    maxlength={6}
                    margin="2px"
                  />
                  
                  <label htmlFor="giaiNhat" className="my-3">
                  Giải Nhất: 
                  </label>
                  <input
                  placeholder={props.staff.prize.rewardNumbers.giaiNhat}
                    type="text"
                    name="giaiNhat"
                    id="giaiNhat"
                    maxlength={5}
                    margin="2px"
                  />
                  <label htmlFor="giaiNhi" className="my-3">
                  Giải nhì: 
                  </label>
                  <input
                  placeholder={props.staff.prize.rewardNumbers.giaiNhi}
                    type="text"
                    name="giaiNhi"
                    id="giaiNhi"
                    maxlength={5}
                    margin="2px"
                  />
                  <InputGroup className="my-3">
                  <label >
                  Giải Ba: 
                  </label>
                    <input
                    placeholder={props.staff.prize.rewardNumbers.giaiBa.giaiBa1}
                      type="text"
                      name="giaiBa1"
                      id="giaiBa1"
                      maxlength={5}
                    />
                    <input
                    placeholder={props.staff.prize.rewardNumbers.giaiBa.giaiBa2}
                      type="text"
                      name="giaiBa2"
                      id="giaiBa2"
                      maxlength={5}
                    />
                  </InputGroup>
                  <label >
                  Giải Tư: 
                  </label>
                  <InputGroup className="my-3 ms-3">                
                    <input
                    placeholder={props.staff.prize.rewardNumbers.giaiTu.giaiTu1}
                      type="text"
                      name="giaiTu1"
                      id="giaiTu1"
                      maxlength={5}
                    />
                    <input
                    placeholder={props.staff.prize.rewardNumbers.giaiTu.giaiTu2}
                      type="text"
                      name="giaiTu2"
                      id="giaiTu2"
                      maxlength={5}
                    />
                    <input
                    placeholder={props.staff.prize.rewardNumbers.giaiTu.giaiTu3}
                      type="text"
                      name="giaiTu3"
                      id="giaiTu3"
                      maxlength={5}
                    />
                    <input
                    placeholder={props.staff.prize.rewardNumbers.giaiTu.giaiTu4}
                      type="text"
                      name="giaiTu4"
                      id="giaiTu4"
                      maxlength={5}
                    />
                    <input
                    placeholder={props.staff.prize.rewardNumbers.giaiTu.giaiTu5}
                      type="text"
                      name="giaiTu5"
                      id="giaiTu5"
                      maxlength={5}
                    />
                    <input
                    placeholder={props.staff.prize.rewardNumbers.giaiTu.giaiTu6}
                      type="text"
                      name="giaiTu6"
                      id="giaiTu6"
                      maxlength={5}
                    />
                    <input
                    placeholder={props.staff.prize.rewardNumbers.giaiTu.giaiTu7}
                      type="text"
                      name="giaiTu7"
                      id="giaiTu7"
                      maxlength={5}
                    />
                  </InputGroup>
                  <label >
                  Giải Năm: 
                  </label>                 
                  <input
                  placeholder={props.staff.prize.rewardNumbers.giaiNam}
                    type="text"
                    name="giaiNam"
                    id="giaiNam"
                    maxlength={4}
                  />
                  <br />
                  <label >
                  Giải Sáu: 
                  </label>
                  <InputGroup className="my-3 ms-3">                  
                    <input
                    placeholder={props.staff.prize.rewardNumbers.giaiSau.giaiSau1}
                      type="text"
                      name="giaiSau1"
                      id="giaiSau1"
                      maxlength={4}
                    />
                    <input
                    placeholder={props.staff.prize.rewardNumbers.giaiSau.giaiSau2}
                      type="text"
                      name="giaiSau2"
                      id="giaiSau2"
                      maxlength={4}
                    />
                    <input
                    placeholder={props.staff.prize.rewardNumbers.giaiSau.giaiSau3}
                      type="text"
                      name="giaiSau3"
                      id="giaiSau3"
                      maxlength={4}
                    />
                  </InputGroup>
                  
                  <label htmlFor="giaiDB" className="my-3" >
                  Giải Bảy: 
                  </label>
                    <input
                      placeholder="giải bảy"
                      type="text"
                      name="giaiBay"
                      id="giaiBay"
                      maxlength={3}
                    />
                   <label htmlFor="giaiDB" className="my-3" >
                  Giải Tám: 
                  </label>
                    <input
                      placeholder="giải tám"
                      type="text"
                      name="giaiTam"
                      id="giaiTam"
                      maxlength={2}
                    />
                  <br />
                
           <button type="submit">update</button>
           </form>
          </div>
        </div>
      );}
      else return <div></div>;
  
    }
    return <EmployeeDetail />;
  }


export default connect(null,mapDispatchToProps)(VeDoEdit);
