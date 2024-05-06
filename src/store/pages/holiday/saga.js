import { call, put, takeEvery } from "redux-saga/effects"
// Login Redux States
import { GET_HOLIDAYLIST, ADD_HOLIDAY, UPDATE_HOLIDAY,DELETE_HOLIDAYLIST } from "./actionTypes"
import {
  HolidayApiError,
  addHolidaySuccess,
  getHolidaysSuccess,
  deleteHolidayesSuccess,
  HolidayeSearchedSuccessfully,
} from "./actions"

import {
  getHolidayAPI,
  addHolidayAPI,
  updateHolidaysAPI,
  deleteHolidaysAPI
} from "../../../helpers/fakebackend_helper"
function* HolidayAdd(payload) {
  // debugger
  try {
    const response = yield call(addHolidayAPI,payload.payload)
    yield put(addHolidaySuccess(response))
    // if (response.statusCode === "000") {
    //   yield call(getHolidayList())
    // }
  } catch (error) {
    yield put(HolidayApiError(error))
  }
}
function* deleteHolidayList(id) {
  try {
    const response = yield call(deleteHolidaysAPI, id.payload);
    //check reponse status if responce is success then call list autherwise return error
    yield put(deleteHolidayesSuccess(id));
    yield call(getHolidayList);
  } catch (error) {
    yield put(HolidayApiError(error));
  }
}
function* updateHolidayList(data) {
  try {
    const response = yield call(updateHolidaysAPI, data.id, data.payload)
    //check reponse status if responce is success then call list autherwise return error
    yield call(getHolidayAPI())
  } catch (error) {
    yield put(HolidayApiError(error))
  }
}
function* getHolidayList(params) {
  try {
    const response = yield call(getHolidayAPI, params.payload)
    yield put(getHolidaysSuccess(response))
  } catch (error) {
    yield put(HolidayApiError(error))
  }
}

function* HolidaySaga() {
  yield takeEvery(ADD_HOLIDAY, HolidayAdd)
  yield takeEvery(GET_HOLIDAYLIST, getHolidayList)
  yield takeEvery(DELETE_HOLIDAYLIST, deleteHolidayList);
  yield takeEvery(UPDATE_HOLIDAY, updateHolidayList)
}
export default HolidaySaga
