import { call, put, takeEvery } from "redux-saga/effects"
// Login Redux States
import {
  ADD_EMPLOYEE,
  GET_EMPLOYEES,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
} from "./actionTypes"
import { postEmployeeList } from "../../../helpers/fakebackend_helper"
import {
  addEmployeeSuccess,
  getEmployeeSuccess,
  employeeApiError,
  deleteEmployeeSuccess,
} from "./actions"

// import { addEmployeeApi, getEmployeesListApi,updateDepartmentAPI,deleteEmployeeApi} from './serviceHelper';

function* addEmployeeDetail(payload) {
  try {
    const response = yield call(postEmployeeList, payload.payload)
    yield put(addEmployeeSuccess(response))
    yield call(getDepartmentlist)
  } catch (error) {
    yield put(employeeApiError(error))
  }
}
function* getDepartmentlist(params) {
  try {
    // const response = yield call(getEmployeesListApi,params.payload);
    // yield put(getEmployeeSuccess(response));
  } catch (error) {
    yield put(employeeApiError(error))
  }
}
function* updateDepartment(data) {
  try {
    //  yield call(updateDepartmentAPI,data.payload);
    yield call(getDepartmentlist)
  } catch (error) {
    //check reponse status if responce is success then call list autherwise return error

    yield put(departmentApiError(error))
  }
}
function* deleteEmployee(id) {
  try {
    // const response = yield call(deleteEmployeeApi,id.payload);
    //check reponse status if responce is success then call list autherwise return error

    yield put(deleteEmployeeSuccess(id))
    yield call(getDepartmentlist)
  } catch (error) {
    yield put(branchApiError(error))
  }
}

function* employeeSaga() {
  yield takeEvery(ADD_EMPLOYEE, addEmployeeDetail)
  yield takeEvery(GET_EMPLOYEES, getDepartmentlist)
  yield takeEvery(UPDATE_EMPLOYEE, updateDepartment)
  yield takeEvery(DELETE_EMPLOYEE, deleteEmployee)
}
export default employeeSaga
