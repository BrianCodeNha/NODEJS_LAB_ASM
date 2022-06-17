import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Employee from "./Employee";
import SearchPage from "./SearchPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Staff from "./Staff";
import Department from "./Department";
import Salary from "./Salary";
import { connect } from "react-redux";
import {
  fetchDepartments,
  fetchStaffs,
  fetchSalary,
  postStaff,
  deleteEmployee,
} from "../Redux/ActionCreator";
import Test from "./test";
import QuanLyVeDo from "./QuanLyVeDo";
import { VeDoEdit } from "./VeDoEdit";
import axios from "axios";

// get state, and dispatch from store

const mapStateToProps = (state) => ({
  ticketListFromServer: state.staffList,
  veDoList: state.veDoList,
  isLoading: state.isLoading,
  errMess: state.errMess,
  departmentFromServer: state.departments,
  staffSalaryFromServer: state.staffSalary,
});

const mapDispatchToProp = (dispatch) => ({
  fetchStaffs: () => {
    dispatch(fetchStaffs());
  },
  fetchDepartments: () => {
    dispatch(fetchDepartments());
  },
  fetchSalary: () => {
    dispatch(fetchSalary());
  },
  postStaff: (
    id,
    EmployeeName,
    doB,
    startDate,
    departmentId,
    salaryScale,
    annualLeave,
    overTime,
    image
  ) => {
    dispatch(
      postStaff(
        id,
        EmployeeName,
        doB,
        startDate,
        departmentId,
        salaryScale,
        annualLeave,
        overTime,
        image
      )
    );
  },
  deleteEmployee: (id) => {
    dispatch(deleteEmployee(id));
  },
});

export function MainComponent({
  ticketListFromServer,
  isLoading,
  errMess,
  departmentFromServer,
  staffSalaryFromServer,
  fetchStaffs,
  fetchSalary,
  fetchDepartments,
  postStaff,
  deleteEmployee,
}) {
  //store stafflist here
  const [staffList, setStaffList] = useState([]);
  const [veDoList, setVeDoList] = useState([]);

  useEffect(() => {
    // insert mapDispatchToProp
    fetchStaffs();
    const fetchDataVeDo = async () => {
     
      const response = await axios.get(
        "http://localhost:5000/admin/checkticket"
      );
      setVeDoList(response.data);
      
      
    };
    fetchDataVeDo();
  }, []); // component Did mount

  

  //staffId for idividiual view

  const [staffId, setStaffId] = useState(null);

  const selectedEmployee = (selectedID) => {
    setStaffId(selectedID);
  };

  // this is for sort entry

  const [property, setProperty] = useState("producer"); //store sortEntry here

  const sortDataEntry = (entry) => {
    setProperty(entry);
    ticketListFromServer.sort(function (a, b) {
      if (entry === "number") {
        return b.number - a.number;
      } else if (entry === "producer") {        
        if (a.producer.toLowerCase() > b.producer.toLowerCase()) return 1;
        else if (a.producer.toLowerCase() < b.producer.toLowerCase()) return -1;
      }
      if (entry === "date") {
        if (a.date.toLowerCase() > b.date.toLowerCase()) return 1;
        if (a.date.toLowerCase() < b.date.toLowerCase()) return -1;
      }
    });
  };

  const staffWithId = ({ match }) => (
    <Employee
      staff={
        ticketListFromServer.filter(
          (staff) => staff._id === match.params.staffId.toString()
        )[0]
      }
      isLoading={isLoading}
      errMess={errMess}
    />
  );

  
  console.log("🚀 ~ file: MainComponent.js ~ line 145 ~ veDoList", veDoList)

  const veDoWithId = ({ match }) => (
    <VeDoEdit
      staff={
        veDoList.filter(
          (staff) => staff._id === match.params.veDoId.toString()
        )[0]
      }
      isLoading={isLoading}
      errMess={errMess}
    />
  );
 

  return (
    <div>
      <BrowserRouter>
        <Header />

        <Switch>          
          <Route exact path="/">
          <QuanLyVeDo veDoList={veDoList} />
          </Route>
          <Route exact path="/vedo/:veDoId">{veDoWithId}</Route>
          <Route exact path="/veso">
            <Staff
              staffs={ticketListFromServer}
              onClick={(selectedID) => selectedEmployee(selectedID)}
              getSortEntry={(entry) => sortDataEntry(entry)}
              deleteEmployee={deleteEmployee}
              isLoading={isLoading}
              errorMess={errMess}
            />
          </Route>
          <Route exact path="/veso/:staffId">{staffWithId}</Route>
          <Route path="/search">
            <SearchPage staffs={ticketListFromServer} />
          </Route>

        </Switch>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProp)(MainComponent);
