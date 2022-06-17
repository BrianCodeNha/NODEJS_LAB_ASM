import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Loading } from "./Loading";

import SearchBar from "./SearchBar";
//styles
import "./staff.css";
import { useState } from "react";
// transition animation
import { FadeTransform } from "react-animation-components";

export default function Staff(props) {

  const [pageSize, setSize] = useState('20')
  const [pageNumber, setPageNumber] = useState('1')

  const paginate = (array, pageSize, pageNumber) => {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  };

  const numberOfPage = Math.floor(props.staffs.length/(pageSize*1)) + (props.staffs.length%(pageSize*1) > 0 ? 1 : 0);  
  
  const numberArr = (n) => {
    let arr = [];
    while (n > 0) {
      arr.push(n);
      n = n - 1;
    }
    console.log("🚀 ~ file: Staff.js ~ line 25 ~ pages ~ arr", arr)
    return arr.reverse();    
  }

  const pages = numberArr(numberOfPage)
  console.log("🚀 ~ file: Staff.js ~ line 34 ~ Staff ~ pages", pages)
  
  const paginateStaffs = paginate(props.staffs, pageSize, pageNumber)

  const staffDetail = paginateStaffs.map((staff) => (
    <div
      onClick={() => props.onClick(staff.id)}
      key={staff._id}
      className="outer col-12 col-md-4 col-lg-3 justify-content-center"
      style={{padding: '20px'}}
    >
      <div className="item">
        <FadeTransform
          in
          transformProps={{
            exitTransform: "scale(0.5) translateY(-50%)",
          }}
        >
          <Link exact to={`/veso/${staff._id}`}>
            <div style={{backgroundColor: '#EBEBEB', borderRadius: '25px', height:  '150px', width: '100%', textAlign: 'left', padding: '10px'}} >
             <strong>Đài: </strong> {staff.producer } <br />
             <strong>Số: </strong> {staff.number}<br />
             <strong>Ngày xổ số: </strong> {staff.date}<br />
             <strong>Kết quả dò: </strong> {staff.result}
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

  if (props.isLoading) {
    return <Loading />;
  } else if (props.errMess) {
    return <h4>{props.errMess}</h4>;
  } else {
    return (
      <div className="row cod-flex p-2">
        <SearchBar getSortEntry={(entry) => props.getSortEntry(entry)} />
        <div>
          <section className="pagination d-flex justify-content-center">
          {pages.map(page => (
            <button key={page} onClick={() => setPageNumber(page)} className="mx-2">{page}</button>
          ))}
         
         

         <form action="#">
          <div className="input-group">
            <select onChange={(e) => setSize(e.target.value)}>
              <option>20</option>
              <option>10</option>
              <option>5</option>
            </select>
            <button type='submit'>
              select
            </button>
          </div>
         </form>
          </section>
        </div>
        {staffDetail}
      </div>
    );
  }
}
