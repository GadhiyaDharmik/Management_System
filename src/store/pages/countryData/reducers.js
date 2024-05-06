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

const initialState = {
  country: [],
  states: [],
  citys: [],
  shiftList:[],
  error: '',
  loading: false,
};
const countrysData = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRYLIST:
      state = {
        ...state,
        loading: false,
      };
      break;
    case GET_COUNTRYLIST_SUCCESS:
      state = {
        ...state,
        country: action.payload,
        loading: false,
      };
      break;
    case GET_STATELIST:
      state = {
        ...state,
        loading: false,
      };
      break;
    case GET_STATELIST_SUCCESS:
      state = {
        ...state,
        states: action.payload,
        loading: false,
      };
      break;
    case GET_CITYLIST:
      state = {
        ...state,
        loading: false,
      };
      break;
    case GET_CITYLIST_SUCCESS:
      state = {
        ...state,
        citys: action.payload,
        loading: false,
      };
      break;
      case GET_SHIFTLIST:
      state = {
        ...state,
        loading: false,
      };
      break;
    case GET_SHIFTLIST_SUCCESS:
      state = {
        ...state,
        shiftList: action.payload,
        loading: false,
      };
      break;
    case COUNTRY_API_ERROR:
      state = { ...state, error: action.payload, loading: false };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};
export default countrysData;
