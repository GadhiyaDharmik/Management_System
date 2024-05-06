import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"

//contacts
import contacts from "./contacts/reducer"

//employee List
import employeesData from "./pages/employeesList/reducer"

//Holiday
import holidayListData from "./pages/holiday/redusers"

//branch
import branch from "./pages/branch/reducers"

//Department
import department from "./pages/department/reducer"

//Country Data
import countrysData from "./pages/countryData/reducers"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  contacts,
  employeesData,
  holidayListData,
  branch,
  department,
  countrysData,
})

export default rootReducer
