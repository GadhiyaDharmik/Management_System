import {
  ADD_BRANCH,
  ADD_SUCCESS,
  GET_BRANCHLIST,
  SEARCH_BRANCH,
  SEARCH_BRANCH_SUCCESS,
  BRANCH_API_ERROR,
  GET_BRANCHLIST_SUCCESS,
  DELETE_BRANCHLIST,
  DELETE_BRANCHLIST_SUCCESS,
  EDIT_BRANCH,
  UPDATE_BRANCH,
  INIT_ADD,
} from './actionTypes';

export const  addBranch = (data) => {
  return {
    type: ADD_BRANCH,
    payload: data,
  };
};
export const addBranchSuccess = (user) => {
  return {
    type: ADD_SUCCESS,
    payload: user?.data,
  };
};
export const getBranches = (params) => {
  return {
    type: GET_BRANCHLIST,
    payload: params,
  };
};
export const getBranchesSuccess = (data) => {
  return {
    type: GET_BRANCHLIST_SUCCESS,
    payload: data,
  };
};
export const searchBranches = (data) => {
  return {
    type: SEARCH_BRANCH,
    payload: data,
  };
};
export const brancheSearchedSuccessfully = (data) => {
  return {
    type: SEARCH_BRANCH_SUCCESS,
    payload: data,
  };
};
export const branchApiError = (error) => {
  return {
    type: BRANCH_API_ERROR,
    payload: error,
  };
};

export const editBranch = (data) => {
  return {
    type: EDIT_BRANCH,
    payload: data,
  };
};
export const updateBranch = (data) => {
  return {
    type: UPDATE_BRANCH,
    payload: data,
  };
};
export const deleteBranches = (id) => {
  return {
    type: DELETE_BRANCHLIST,
    payload: id,
  };
};

export const deleteBranchesSuccess = (data) => {
  return {
    type: DELETE_BRANCHLIST_SUCCESS,
    payload: data,
  };
};

export const initAdd = () => {
  return {
    type: INIT_ADD,
  };
};
