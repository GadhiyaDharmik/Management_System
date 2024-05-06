import {
  ADD_EMPLOYEE,
  ADD_SUCCESS,
  GET_EMPLOYEES,
  GET_EMPLOYEE_SUCCESS,
  EMPLOYEE_API_ERROR,
  UPDATE_EMPLOYEE,
  EDIT_EMPLOYEE,
  INIT_ADD,
  DELETE_EMPLOYEE,
  DELETE_EMPLOYEE_SUCCESS,
} from './actionTypes';

export const addEmployee = (data) => {
  return {
    type: ADD_EMPLOYEE,
    payload: data,
  };
};
export const addEmployeeSuccess = (user) => {
  return {
    type: ADD_SUCCESS,
    payload: user?.data,
  };
};

export const getEmployees = (parms) => {
  return {
    type: GET_EMPLOYEES,
    payload:parms,
  };
};

export const getEmployeeSuccess = (data) => {
  return {
    type: GET_EMPLOYEE_SUCCESS,
    payload: data,
  };
};
export const changeEmployeeDetail = (data) => {
  return {
    type: EDIT_EMPLOYEE,
    payload: data,
  };
};
export const initAddEmployee = () => {
  return {
    type: INIT_ADD,
  };
};
export const updateEMPLOYEE = (data) => {
  return {
    type: UPDATE_EMPLOYEE,
    payload: data,
  };
};

export const employeeApiError = (error) => {
  return {
    type: EMPLOYEE_API_ERROR,
    payload: error,
  };
};
export const deleteEmployee = (id) => {
  ;
  return {
    type: DELETE_EMPLOYEE,
    payload: id,
  };
};

export const deleteEmployeeSuccess = (data) => {
  return {
    type: DELETE_EMPLOYEE_SUCCESS,
    payload: data,
  };
};