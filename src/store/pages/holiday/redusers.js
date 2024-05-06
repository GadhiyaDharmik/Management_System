import {
  ADD_HOLIDAY,
  ADD_SUCCESS,
  GET_HOLIDAYLIST,
  SEARCH_HOLIDAY,
  SEARCH_HOLIDAY_SUCCESS,
  HOLIDAY_API_ERROR,
  GET_HOLIDAYLIST_SUCCESS,
  DELETE_HOLIDAYLIST,
  DELETE_HOLIDAYLIST_SUCCESS,
  EDIT_HOLIDAY,
  UPDATE_HOLIDAY,
  INIT_ADD,
} from './actionTypes';
const initialState = {
  holidays: [],
  totalCount: 0,
  error: '',
  loading: false,
  holidayData: {
    holiday: '',
    holidayOn: "",
    location: '',
    details: '',
    employeeShiftId: 1,
    countryId: 1
  },
};
const branch = (state = initialState, action) => {
  
  switch (action.type) {
    case ADD_HOLIDAY:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ADD_SUCCESS:
      state = {
        ...state,
        branch: action.payload,
        holidayDate:action.payload,
        loading: false,
      };
      break;
    case GET_HOLIDAYLIST:
      state = {
        ...state,
        branch: action.payload,
        loading: false,
      };
      break;
    case GET_HOLIDAYLIST_SUCCESS:
      state = {
        ...state,
        holidays: action.payload?.data,
        totalCount: action.payload?.totalCount,
        loading: false,
      };
      break;
    case SEARCH_HOLIDAY:
      state = {
        ...state,
        branch: action.payload,
        loading: false,
      };
      break;
    case SEARCH_HOLIDAY_SUCCESS:
      state = {
        ...state,
        branch: action.payload,
        loading: false,
      };
      break;
    case EDIT_HOLIDAY:
      state = {
        ...state,
        holidayData: action.payload,
      };
      break;
    case UPDATE_HOLIDAY:
      state = {
        ...state,
        holidayData: action.payload,
        loading: true,
      };
      break;
    case INIT_ADD:
      state = {
        ...state,
        holidayData: {
          name: '',
          address: '',
          totalEmployee: '',
          phoneNumber: '',
          cityId: 1,
          stateId: 1,
          countryId: 2,
          isActive: false,
        },
        loading: true,
      };
      break;
    case DELETE_HOLIDAYLIST:
      state = {
        ...state,
        loading: false,
      };
      break;
    case DELETE_HOLIDAYLIST_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;

    case HOLIDAY_API_ERROR:
      state = { ...state, error: action.payload, loading: false };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};
export default branch;
