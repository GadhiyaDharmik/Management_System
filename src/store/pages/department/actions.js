import {
  ADD_DEPARTMENT,
  ADD_SUCCESS,
  GET_DEPARTMENT,
  GET_DEPARTMENT_SUCCESS,
  DEPARTMENT_API_ERROR,
  UPDATE_DEPARTMENT,
  EDIT_DEPARTMENT,
  INIT_ADD,
  DELETE_DEPARTMENT,
  DELETE_DEPARTMENT_SUCCESS,
} from './actionTypes';

export const addDepartMent = (data) => {
  return {
    type: ADD_DEPARTMENT,
    payload: data,
  };
};
export const adddepartmentSuccess = (user) => {
  return {
    type: ADD_SUCCESS,
    payload: user?.data,
  };
};

export const getDepartment = (params) => {
  return {
    type: GET_DEPARTMENT,
    payload: params,
  };
};

export const getDepartmentSuccess = (data) => {
  return {
    type: GET_DEPARTMENT_SUCCESS,
    payload: data,
  };
};

export const departmentSearchSuccess = (data) => {
  // debugger;
  return {
    type: SEARCH_DEPARTMENT_SUCCESS,
    payload: data,
  };
};
export const changeDepartmentDetail = (data) => {
  return {
    type: EDIT_DEPARTMENT,
    payload: data,
  };
};
export const initAddDepartment = () => {
  return {
    type: INIT_ADD,
  };
};
export const updateDepartment = (data) => {
  // debugger;
  return {
    type: UPDATE_DEPARTMENT,
    payload: data,
  };
};

export const departmentApiError = (error) => {
  return {
    type: DEPARTMENT_API_ERROR,
    payload: error,
  };
};
export const deletedepartment = (id) => {
  return {
    type: DELETE_DEPARTMENT,
    payload: id,
  };
};

export const deletedepartmentSuccess = (data) => {
  return {
    type: DELETE_DEPARTMENT_SUCCESS,
    payload: data,
  };
};