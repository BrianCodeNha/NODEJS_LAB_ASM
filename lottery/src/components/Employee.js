import React, { useState } from "react";
import dateFormat from 'dateformat'
import {Link} from 'react-router-dom'
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdb-react-ui-kit";
import {Loading} from './Loading'
import './Employee.css'
import { updateEmployee } from "../Redux/ActionCreator";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => ({
  updateEmployee: (editId, Editedemployee) => dispatch(updateEmployee(editId, Editedemployee))
})

export function Employee(props) { //truyền data fetch từ server truyền vào props     

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
    console.log("🚀 ~ file: Employee.js ~ line 34 ~ EmployeeDetail ~ props.staff", props.staff)

      let updateTicket = {
        date: props.staff.date,
        number: props.staff.number,
        producer: props.staff.producer,
        userId: props.staff.userId,
        id: props.staff._id
      }


      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(updateTicket)
       props.updateEmployee(updateTicket.id, updateTicket);
      }
      
      const handleChange = (e) => {
        const {name, value} = e.target;
       return updateEmployee = {...updateEmployee,[name]: value}       
      }
 
      return (
        <div className="staff row container">
        <MDBBreadcrumb>
            <MDBBreadcrumbItem>
              <Link to='/veso'>Quản Lý Vé Số</Link>
            </MDBBreadcrumbItem>
            <MDBBreadcrumbItem active>{props.staff.number}</MDBBreadcrumbItem>
          </MDBBreadcrumb>
          <div className="col-12 col-md-4 col-lg-3">
            
          </div>
          <div className="col-12 col-md-8 col-lg-9">
          <h3>Số vé số: {props.staff.number}</h3>
          <p>          
          Đài xổ số: {props.staff.producer}<br />             
          Ngày xổ Số: {props.staff.date}<br />             
          </p>
          <h3>KẾT QUẢ XỔ SỐ: {props.staff.result}</h3>
          <hr/>
           <h3>Cập nhật thông tin vé số</h3>
           <form >
           <label htmlFor="number" className="row container">Họ và tên: 
           <input type='text' name='number' placeholder={props.staff.number} onChange={(e) => handleChange(e)} />
           </label>
           <label htmlFor="producer" className="row container">Đài xổ số: 
           <input type='text' name='producer' placeholder={props.staff.producer}  onChange={(e) => handleChange(e)} />
           </label>
           <label htmlFor="date" className="row container">Ngày xổ số: 
           <input type='date' name='date'  onChange={(e) => handleChange(e)} />
           </label>           
           <button type="submit">update</button>
           </form>
          </div>
        </div>
      );}
      else return <div></div>;
  
    }
    return <EmployeeDetail />;
  }


export default connect(null,mapDispatchToProps)(Employee);
