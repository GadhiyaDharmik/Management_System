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
const initialState = {
  branchs: [],
  totalCount: 0,
  error: '',
  loading: false,
  branchData: {
    name: ' ',
    address: '',
    totalEmployee: '',
    phoneNumber: '',
    cityId: 1,
    stateId: 1,
    countryId: 2,
    isActive: true,
  },
};
const branch = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BRANCH:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ADD_SUCCESS:
      state = {
        ...state,
        branch: action.payload,
        loading: false,
      };
      break;
    case GET_BRANCHLIST:
      state = {
        ...state,
        branch: action.payload,
        loading: false,
      };
      break;
    case GET_BRANCHLIST_SUCCESS:
      state = {
        ...state,
        branchs: action.payload?.data,
        totalCount: action.payload?.totalCount,
        loading: false,
      };
      break;
    case SEARCH_BRANCH:
      state = {
        ...state,
        branch: action.payload,
        loading: false,
      };
      break;
    case SEARCH_BRANCH_SUCCESS:
      state = {
        ...state,
        branch: action.payload,
        loading: false,
      };
      break;
    case EDIT_BRANCH:
      
      state = {
        ...state,
        branchData: action.payload,
      };
      break;
    case UPDATE_BRANCH:
      state = {
        ...state,
        branchData: action.payload,
       };
      break;
    case INIT_ADD:
      state = {
        ...state,
        branchData: {
          name: '',
          address: '',
          totalCount: 0,
          totalEmployee: '',
          phoneNumber: '',
          cityId: 1,
          stateId: 1,
          countryId: 2,
          isActive: true,
        },
        loading: true,
      };
      break;
    case DELETE_BRANCHLIST:
      state = {
        ...state,
        loading: false,
      };
      break;
    case DELETE_BRANCHLIST_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;

    case BRANCH_API_ERROR:
      state = { ...state, error: action.payload, loading: false };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};
export default branch;
