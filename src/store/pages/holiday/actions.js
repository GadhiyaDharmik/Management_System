import {
  ADD_HOLIDAY,
  ADD_SUCCESS,
  GET_HOLIDAYLIST,
  SEARCH_HOLIDAY,
  SEARCH_HOLIDAY_SUCCESS,
  GET_HOLIDAYLIST_SUCCESS,
  DELETE_HOLIDAYLIST,
  DELETE_HOLIDAYLIST_SUCCESS,
  EDIT_HOLIDAY,
  UPDATE_HOLIDAY,
  HOLIDAY_API_ERROR,
  INIT_ADD,
} from './actionTypes';

export const addHoliday = (data) => {
  // debugger
  return {
    type: ADD_HOLIDAY,
    payload: data,

  };
};
export const addHolidaySuccess = (user) => {
  return {
    type: ADD_SUCCESS,
    payload: user?.data,
  };
};
export const getHolidayList = (data) => {
  return {
    type: GET_HOLIDAYLIST,
    payload: data,
  };
};
export const getHolidaysSuccess = (data) => {
  return {
    type: GET_HOLIDAYLIST_SUCCESS,
    payload: data,
  };
};
export const searchHolidayes = (data) => {
  return {
    type: SEARCH_HOLIDAY,
    payload: data,
  };
};
export const HolidayeSearchedSuccessfully = (data) => {
  return {
    type: SEARCH_HOLIDAY_SUCCESS,
    payload: data,
  };
};
export const HolidayApiError = (error) => {
  return {
    type: HOLIDAY_API_ERROR,
    payload: error,
  };
};

export const editHoliday = (data) => {
  return {
    type: EDIT_HOLIDAY,
    payload: data,
  };
};
export const updateHoliday = (id,data) => {
  
  return {
    type: UPDATE_HOLIDAY,
    id:id,
    payload: data,
  };
};
export const deleteHolidayes = (id) => {
  return {
    type: DELETE_HOLIDAYLIST,
    payload: id,
  };
};

export const deleteHolidayesSuccess = (data) => {
  return {
    type: DELETE_HOLIDAYLIST_SUCCESS,
    payload: data,
  };
};

export const initHolidayAdd = () => {
  return {
    type: INIT_ADD,
  };
};
