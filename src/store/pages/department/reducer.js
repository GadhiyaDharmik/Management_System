import {
  ADD_DEPARTMENT,
  ADD_SUCCESS,
  GET_DEPARTMENT,
  GET_DEPARTMENT_SUCCESS,
  DEPARTMENT_API_ERROR,
  EDIT_DEPARTMENT,
  UPDATE_DEPARTMENT,
  DELETE_DEPARTMENT,
  DELETE_DEPARTMENT_SUCCESS,
  INIT_ADD,
} from './actionTypes';

const initialState = {
  departmentList: [],
  totalCount: 0,
  error: '',
  loading: false,
  departmentData: {
    name: '',
    hodName: '',
    totalEmployee: 0,
    branchId: 0,
    isActive: true,
  },
};
const department = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DEPARTMENT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ADD_SUCCESS:
      state = {
        ...state,
        departmentList: action.payload,
        loading: false,
      };
      break;
    case GET_DEPARTMENT:
      state = {
        ...state,
        department: action?.payload,
        loading: false,
      };
      break;
    case GET_DEPARTMENT_SUCCESS:
      state = {
        ...state,
        departmentList: action.payload.data,
        totalCount: action.payload.totalCount,
        loading: false,
      };
      break;
   
    case UPDATE_DEPARTMENT:
      state = {
        ...state,
        departmentData: action.payload,
      };
    case EDIT_DEPARTMENT:
      state = {
        ...state,
        departmentData: action.payload,
      };
      break;
    case INIT_ADD:
      state = {
        ...state,
        departmentData: {
          name: '',
          hodName: '',
          totalEmployee: 0,
          branchId: 0,
          isActive: true,
        },
      };
      break;
    case DEPARTMENT_API_ERROR:
      state = { ...state, error: action.payload, loading: false };
      break;

    default:
      state = { ...state };
      break;

    case DELETE_DEPARTMENT:
      state = {
        ...state,
        loading: false,
      };
      break;
    case DELETE_DEPARTMENT_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
  }
  return state;
};
export default department;