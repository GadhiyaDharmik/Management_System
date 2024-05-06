import { call, put, takeEvery } from 'redux-saga/effects';
// Login Redux States
import { ADD_DEPARTMENT, GET_DEPARTMENT, UPDATE_DEPARTMENT, DELETE_DEPARTMENT, SEARCH_DEPARTMENT } from './actionTypes';
import {
  adddepartmentSuccess,
  getDepartmentSuccess,
  departmentApiError,
  deletedepartmentSuccess,
  departmentSearchSuccess,
} from './actions';

import {
  getDepartmentAPI,
   
 } from "../../../helpers/fakebackend_helper"

function* departmentAdd(payload) {
  try {
    const response = yield call(adddepartmentAPI, payload.payload);
    yield put(adddepartmentSuccess(response));
    yield call(getDepartmentlist);
  } catch (error) {
    yield put(departmentApiError(error));
  }
}
function* getDepartmentlist(params) {
  try {
    const response = yield call(getDepartmentAPI,params.payload);
    yield put(getDepartmentSuccess(response));
  } catch (error) {
    yield put(departmentApiError(error));
  }
}
function* updateDepartment(data) {
  try {
    yield call(updateDepartmentAPI, data.payload);
    yield call(getDepartmentlist);
  } catch (error) {
    //check reponse status if responce is success then call list autherwise return error
    yield put(departmentApiError(error));
  }
}
function* deletedepartmentlist(id) {
  try {
    yield call(deletedepartmentAPI, id.payload);
    //check reponse status if responce is success then call list autherwise return error
    yield put(deletedepartmentSuccess(id));
    yield call(getDepartmentlist);
  } catch (error) {
    yield put(branchApiError(error));
  }
}

function*  departmentSaga() {
  yield takeEvery(ADD_DEPARTMENT, departmentAdd);
  yield takeEvery(GET_DEPARTMENT, getDepartmentlist);
  yield takeEvery(UPDATE_DEPARTMENT, updateDepartment);
  yield takeEvery(DELETE_DEPARTMENT, deletedepartmentlist);
}
export default departmentSaga;