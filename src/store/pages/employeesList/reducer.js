import {
  ADD_EMPLOYEE,
  ADD_SUCCESS,
  GET_EMPLOYEES,
  GET_EMPLOYEE_SUCCESS,
  EMPLOYEE_API_ERROR,
  EDIT_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  DELETE_EMPLOYEE_SUCCESS,
  INIT_ADD,
} from './actionTypes';

const initialState = {
  employeesList: [],
  totalCount: 0,
  error: '',
  loading: false,
  employeeData: {
    file: '',
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    branchId: '',
    departmentId: '',
    gender: '',
    companyName: '',
    workType: '',
    roleId: 0,
    joiningDate: '',
    officeTime: '16:00:00',
    userType: '',
    salary: '',
    address: '',
    countryId: 0,
    stateId: 0,
    cityId: 0,
    password: '',
  },
};
const employeesData = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ADD_SUCCESS:
      state = {
        ...state,
        employeesList: action.payload,
        loading: false,
      };
      break;
    case GET_EMPLOYEES:
      state = {
        ...state,
        employeesList: action.payload.data,
        loading: false,
      };
      break;
    case GET_EMPLOYEE_SUCCESS:
      state = {
        ...state,
        employeesList: action.payload.data,
        totalCount: action.payload.totalCount,
        loading: false,
      };
      break;
    case UPDATE_EMPLOYEE:
      state = {
        ...state,
        employeeData: action.payload,
      };
    case EDIT_EMPLOYEE:
      state = {
        ...state,
        employeeData: action.payload,
      };
      break;
    case INIT_ADD:
      state = {
        ...state,
        employeeData: {
          file: '',
          userName: '',
          firstName: '',
          lastName: '',
          email: '',
          mobileNumber: '',
          branchId: '',
          departmentId: '',
          gender: '',
          companyName: '',
          workType: '',
          roleId: 0,
          joiningDate: '',
          officeTime: '16:00:00',
          userType: '',
          salary: '',
          address: '',
          countryId: 0,
          stateId: 0,
          cityId: 0,
          password: '',
        },
      };
      break;
    case EMPLOYEE_API_ERROR:
      state = { ...state, error: action.payload, loading: false };
      break;

    default:
      state = { ...state };
      break;

    case DELETE_EMPLOYEE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case DELETE_EMPLOYEE_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
  }
  return state;
};
export default employeesData;
