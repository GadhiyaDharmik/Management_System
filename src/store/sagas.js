import { all, fork } from "redux-saga/effects"

//public
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/login/saga"
import ForgetSaga from "./auth/forgetpwd/saga"
import ProfileSaga from "./auth/profile/saga"
import LayoutSaga from "./layout/saga"
import contactsSaga from "./contacts/saga"

//pages
import departmentSaga  from"./pages/department/saga"
import employeeSaga from "./pages/employeesList/saga"
import holidaysaga from "./pages/holiday/saga"
import branchSaga from "./pages/branch/sagas" 
import countrySaga from "./pages/countryData/saga"
export default function* rootSaga() {
  yield all([
    //public
    AccountSaga(),
    // fork(AuthSaga),
    ProfileSaga(),
    ForgetSaga(),
    fork(LayoutSaga),
    fork(contactsSaga),
    fork(employeeSaga),
    fork(holidaysaga),
    fork(branchSaga),
    fork(departmentSaga),
    fork(countrySaga),

  ])
}
