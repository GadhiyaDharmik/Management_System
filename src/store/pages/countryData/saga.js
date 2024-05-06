import { call, put, takeEvery } from "redux-saga/effects"
// Login Redux States
import { GET_COUNTRYLIST, GET_STATELIST, GET_CITYLIST,GET_SHIFTLIST } from "./actionTypes"
import {
  countryApiError,
  getCountrysSuccess,
  getStateSuccess,
  getCitySuccess,
  getShiftSuccess,
} from "./actions"

import {
  getCountrysListApi,
  getStateListApi,
  getCityListApi,
  getShiftListAPI
} from "../../../helpers/fakebackend_helper"

function* getCountryList() {
  try {
    const response = yield call(getCountrysListApi)
    yield put(getCountrysSuccess(response.data))
  } catch (error) {
    yield put(countryApiError(error))
  }
}
function* getStateList() {
  try {
    const response = yield call(getStateListApi)
    yield put(getStateSuccess(response.data))
  } catch (error) {
    yield put(countryApiError(error))
  }
}
function* getCityList() {
  try {
    const response = yield call(getCityListApi)
    yield put(getCitySuccess(response.data))
  } catch (error) {
    yield put(countryApiError(error))
  }
}
function* getShiftList() {
  try {
    const response = yield call(getShiftListAPI)
    yield put(getShiftSuccess(response.data))
  } catch (error) {
    yield put(countryApiError(error))
  }
}

function* countrySaga() {
  yield takeEvery(GET_COUNTRYLIST, getCountryList)
  yield takeEvery(GET_STATELIST, getStateList)
  yield takeEvery(GET_CITYLIST, getCityList)
  yield takeEvery(GET_SHIFTLIST, getShiftList)
}
export default countrySaga
