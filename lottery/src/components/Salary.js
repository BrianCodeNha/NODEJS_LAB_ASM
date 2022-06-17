import React, { useState } from 'react'
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdb-react-ui-kit";
import {Link} from 'react-router-dom'
import { FadeTransform} from 'react-animation-components';
export default function Salary(props) {
  const [property, setProperty] = useState('none');

  const handleSort = (value) => props.staffs.sort((a, b) => {
    setProperty(value) // sau khi setproperty thì dom sẽ rerender lại ngay và theo đó props.staffs hiển thị vẫn chưa dc sắp xếp, 
    const salaryA = a.salaryScale*3000000 + a.overTime*200000/8;
    const salaryB = b.salaryScale*3000000 + b.overTime*200000/8;
      if(value === 'salary') return salaryB - salaryA 
      if(value === 'id') return a.id - b.id
      if(value === 'overTime') return b.overTime - a.overTime

  })
  
  console.log(property, props.staffs)
  return (
    <div className='content row fluid-container'>
    <MDBBreadcrumb style = {{padding: '20px'}}>
        <MDBBreadcrumbItem>
          <Link to='/'>Nhân Viên</Link>
        </MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>Bảng Lương</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      <div className='sort'>
            <label>Sort by </label>
            <select onChange={(e) => handleSort(e.target.value)}>
                <option value='none'></option>
                <option value='salary'>Lương desc</option>
                <option value='id'>Id asc</option>
                <option value='overTime'>Giờ làm thêm desc</option>
            </select>
            
            </div>
    {props.staffs.map((staff) => {
      
      const luong = Math.floor(staff.salaryScale*3000000 + staff.overTime*200000/8)
      return (
       <div key={staff.id} className='col-12 col-md-6 col-lg-4'>
       <FadeTransform
       in
       transformProps={{
           exitTransform: 'scale(0.5) translateY(-50%)'
       }}>        
          <div className='card'>
            <h3 className='card-title'>
              {staff.name}
            </h3>
            <div className='card-text'>
              Mã nhân viên: {staff.id} <br />
              Hệ số lương: {staff.salaryScale} <br />
              Số giờ làm thêm: {staff.overTime} <br />
            </div>
            <div className='card-header' style={{backgroundColor: "#f5f5f5"}}>
              Lương: {luong.toLocaleString(undefined, {maximumFractionDigits:2})} vnd
            </div>
          </div> 
          </FadeTransform>     
       </div>
    )})}
    </div>
  )
}
