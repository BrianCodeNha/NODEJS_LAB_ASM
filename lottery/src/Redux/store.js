import { applyMiddleware, createStore } from "redux";
import * as ActionTypes from "./ActionTypes"
import thunk from "redux-thunk";
import logger from "redux-logger";

const reducer = (
  state = {    
    staffList: [],
    veDoList: [],
    isLoading: false,
    errMess: null,
    departments:[],
    staffSalary:[]
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_NEW_EMPLOYEE:
        return {...state, staffList: action.payload}
    case ActionTypes.LOAD_STAFFS:
        return {...state, staffList: action.payload, isLoading: false, errMess: null}
    case ActionTypes.LOAD_VEDO:
        return {...state, veDoList: action.payload, isLoading: false, errMess: null}
    case ActionTypes.STAFFS_LOADING:
          return {...state, staffList: [], isLoading: true, errMess: null}
    case ActionTypes.STAFFS_LOADING_FAILED:
        return {...state, staffList: [], isLoading: false, errMess: action.payload}
    case ActionTypes.LOAD_DEPARTMENTS:
        return {...state, departments: action.payload}
    case ActionTypes.LOAD_STAFF_SALARY:
        return {...state, staffSalary: action.payload}
    default:
      return state;
  }
};
export const store = createStore(reducer, applyMiddleware(thunk, logger));
