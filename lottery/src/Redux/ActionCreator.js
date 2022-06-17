import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const addNewEmployee = (newEmployee) => ({
  type: ActionTypes.ADD_NEW_EMPLOYEE,
  payload: newEmployee,
});

// add staff to server

export const postStaff =
  (
    id,
    EmployeeName,
    doB,
    startDate,
    departmentId,
    salaryScale,
    annualLeave,
    overTime,
    image
  ) =>
  (dispatch) => {
    const newEmployee = {
      id: id,
      name: EmployeeName,
      doB: doB,
      startDate: startDate,
      departmentId: departmentId,
      salaryScale: salaryScale,
      annualLeave: annualLeave,
      overTime: overTime,
      image: image
    };

    console.log(newEmployee);
    return fetch(baseUrl + "staffs", {
      method: "POST",
      body: JSON.stringify(newEmployee),
      headers: {"Content-Type": "application/json"},
      credentials: "same-origin"
  })
      .then(
        (response) => {
          console.log(response);
          if (response.ok) {
            return response;
          } else {
            var err = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            err.response = response;
            throw err;
          }
        },
        (err) => {
          throw err;
        }
      )
      .then(response => response.json())
      .then((data) => {dispatch(addStaff(data))})
      .catch((err) => {
        console.log("post comments", err.message);
        alert("postComments Error: " + err.message);
      });
  };

// DELETE employee

export const deleteEmployee = (id) => (dispatch) => {
  
  return fetch(`http://localhost:5000/user/ticket/${id}`,{
    method: 'DELETE'
  })
  .then(
    (response) => {
      console.log(response);
      if (response.ok) {
        return response;
      } else {
        var err = new Error(
          "Error " + response.status + ": " + response.statusText
        );
        err.response = response;
        throw err;
      }
    },
    (err) => {
      throw err;
    }
  )
  .then(response => response.json())
  .then(response => {alert(`successfully delete employeeId: ${id}`); dispatch(addStaff(response))})
  .catch((err) => {
    console.log("delete", err.message);
    alert("delete error: " + err.message);
  });
};


// EDIT EMPLOYEE

export const updateEmployee = (id, employee) => (dispatch) => {
  fetch(baseUrl + `staffs`,{
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee)
  })
  .then(
    (response) => {
      console.log(response);
      if (response.ok) {
        return response;
      } else {
        var err = new Error(
          "Error " + response.status + ": " + response.statusText
        );
        err.response = response;
        throw err;
      }
    },
    (err) => {
      throw err;
    }
  )
  .then(response => response.json())
  .then(data => dispatch(addStaff(data)))
  .catch((err) => {
    console.log("updatedEmployee", err.message);
    alert("updatedEmployee error: " + err.message);
  });
};


  // fetch staff from server

export const fetchStaffs = () => (dispatch) => {
  dispatch(staffLoading(true));

  return fetch('http://localhost:5000/user/ticket')
    .then(
      (response) => {
    
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((staff) => dispatch(addStaff(staff)))
    .catch((error) => dispatch(staffLoadingFailed(error.message)));
};


  // fetch vedo from server

export const fetchVeDo = (veDoList) => (dispatch) => {
  dispatch(staffLoading(true));
  return dispatch(addVeDo(veDoList));  
};

export const addVeDo = (veDoList) => ({
  type: ActionTypes.LOAD_VEDO,
  payload: veDoList,
});

export const addStaff = (staff) => ({
  type: ActionTypes.LOAD_STAFFS,
  payload: staff,
});

export const staffLoading = () => ({
  type: ActionTypes.STAFFS_LOADING,
});

export const staffLoadingFailed = (errMess) => ({
  type: ActionTypes.STAFFS_LOADING_FAILED,
  payload: errMess,
});

// fetch departments from the server

export const fetchDepartments = () => (dispatch) => {
  return fetch(baseUrl + "departments")
    .then((Response) => Response.json())
    .then((deparments) => dispatch(loadDepartments(deparments)));
};

export const loadDepartments = (departments) => ({
  type: ActionTypes.LOAD_DEPARTMENTS,
  payload: departments,
});

// fetch staff salary

export const fetchSalary = () => (dispatch) => {
  return fetch(baseUrl + "staffsSalary")
    .then((response) => response.json())
    .then((staffSalary) => dispatch(loadStaffSalary(staffSalary)));
};

export const loadStaffSalary = (staffSalary) => ({
  type: ActionTypes.LOAD_STAFF_SALARY,
  payload: staffSalary,
});
