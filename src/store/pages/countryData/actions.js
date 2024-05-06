import {
  GET_COUNTRYLIST,
  GET_COUNTRYLIST_SUCCESS,
  GET_STATELIST,
  GET_STATELIST_SUCCESS,
  GET_CITYLIST,
  GET_CITYLIST_SUCCESS,
  GET_SHIFTLIST,
  GET_SHIFTLIST_SUCCESS,
  COUNTRY_API_ERROR,
} from './actionTypes';

export const getCountrys = () => {
  return {
    type: GET_COUNTRYLIST,
  };
};
export const getCountrysSuccess = (data) => {
  return {
    type: GET_COUNTRYLIST_SUCCESS,
    payload: data,
  };
};
export const getStates = () => {
  return {
    type: GET_STATELIST,
  };
};
export const getStateSuccess = (data) => {
  return {
    type: GET_STATELIST_SUCCESS,
    payload: data,
  };
};
export const getCitys = () => {
  return {
    type: GET_CITYLIST,
  };
};
export const getCitySuccess = (data) => {
  return {
    type: GET_CITYLIST_SUCCESS,
    payload: data,
  };
};

export const getShiftList = () => {
  return {
    type: GET_SHIFTLIST,
  };
};
export const getShiftSuccess = (data) => {
  return {
    type: GET_SHIFTLIST_SUCCESS,
    payload: data,
  };
};
export const countryApiError = (error) => {
  return {
    type: COUNTRY_API_ERROR,
    payload: error,
  };
};
