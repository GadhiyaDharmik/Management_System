import { call, put, takeEvery } from 'redux-saga/effects';
// Login Redux States
import { ADD_BRANCH, GET_BRANCHLIST, DELETE_BRANCHLIST, UPDATE_BRANCH, SEARCH_BRANCH } from './actionTypes';
import {
  branchApiError,
  addBranchSuccess,
  getBranchesSuccess,
  deleteBranchesSuccess,
  brancheSearchedSuccessfully,
} from './actions';

import {
  getBranchAPI,
  addBranchAPI,
  // getShiftAPI
} from "../../../helpers/fakebackend_helper"

// import { addBranchAPI, getBranch, deleteBranchsAPI, updateBranchsAPI, searchBranchListAPI } from './serviceHelper';
function* branchAdd(payload) {
  try {
    const response = yield call(addBranchAPI, payload.payload);
    yield put(addBranchSuccess(response));
    if (response.statusCode === '000') {
      yield call(getBranchList);
    }
  } catch (error) {
    yield put(branchApiError(error));
  }
}
function* deleteBranchList(id) {
  try {
    const response = yield call(deleteBranchsAPI, id.payload);
    //check reponse status if responce is success then call list autherwise return error
    yield put(deleteBranchesSuccess(id));
    yield call(getBranchList);
  } catch (error) {
    yield put(branchApiError(error));
  }
}
function* updateBranchList(data) {
  try {
    const response = yield call(updateBranchsAPI, data.id.payload);
    //check reponse status if responce is success then call list autherwise return error

    yield call(getBranchList)

  } catch (error) {
    yield put(branchApiError(error));
  }
}
function* searchBranchList(data) {
  try {
    const response = yield call(searchBranchListAPI, data.payload);
    yield call(brancheSearchedSuccessfully(response));

    //check reponse status if responce is success then call list autherwise return error
  } catch (error) {
    yield put(branchApiError(error));
  }
}
function* getBranchList(params) {
  try {
    const response = yield call(getBranchAPI, params.payload);
    yield put(getBranchesSuccess(response));
    if (response.statusCode === '000') {
      yield call(getBranchList);
    }
  } catch (error) {
    yield put(branchApiError(error));
  }
}

function* branchSaga() {
  yield takeEvery(ADD_BRANCH, branchAdd);
  yield takeEvery(GET_BRANCHLIST, getBranchList);
  yield takeEvery(DELETE_BRANCHLIST, deleteBranchList);
  yield takeEvery(UPDATE_BRANCH, updateBranchList);
  yield takeEvery(SEARCH_BRANCH, searchBranchList);
}
export default branchSaga;
