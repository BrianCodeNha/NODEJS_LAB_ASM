import React from "react";
import { Link } from "react-router-dom";
import { Loading } from "./Loading";

import SearchBar from "./SearchBar";
//styles
import "./staff.css";
import { useState } from "react";
// transition animation
import { FadeTransform } from "react-animation-components";

export default function DanhSachVeDo(props) {
  const staffDetail = props.staffs.map((staff) => (
    <div
     
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
          
            <div style={{backgroundColor: '#EBEBEB', borderRadius: '25px', height:  '150px', width: '100%', textAlign: 'left', padding: '10px'}} >
             <strong>Đài: </strong> {staff.producer } <br />             
             <strong>Ngày xổ số: </strong> {staff.date}<br />
             
            </div>
          
        </FadeTransform>
        <div className="row">
          <button
            
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
        {staffDetail}
      </div>
    );
  }
}
