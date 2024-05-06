import PropTypes from "prop-types"
import React from "react"

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
// import { isauth } from "auth"

import { connect } from "react-redux"

// Import Routes all
import { userRoutes, authRoutes } from "./routes/allRoutes"

// import FileLoginList from "./pages/FileLogin/FileLogin"

// Import all middleware
// import Authmiddleware from "./routes/middleware/Authmiddleware"

import PrivateRoutes from "./routes/PrivateRoutes/privateRoutes"

// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css"

import Dashboard from "./pages/FileLogin/FileLogin"

// Call Api
import { useDispatch } from "react-redux"

// import { getCountrys,getStates,getCitys,getShiftList } from './store/pages/countryData/actions';

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper"

// Import Fack Backend
import fakeBackend from "./helpers/AuthType/fakeBackend"
import Login from "./pages/Authentication/Login"

// Activating fake backend
fakeBackend()

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// }

// init firebase backend
// initFirebaseBackend(firebaseConfig)

const App = props => {
  // const dispatch=useDispatch()
  // const [auth, setAuth] = React.useState(true)
  function getLayout() {
    let layoutCls = VerticalLayout

    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout
        break
      default:
        layoutCls = VerticalLayout
        break
    }
    return layoutCls
  }
  const Layout = getLayout()
  // React.useEffect(()=>{
  //   dispatch(getCountrys())
  //   dispatch(getStates())
  //   dispatch(getCitys())
  //   dispatch(getShiftList())
  // },[])
  // const PrivateRoute = ({
  //   component: Component,
  //   layout: Layout,
  //   isAuthProtected,
  // }) => {
  //   // props => {
  //   return isAuthProtected ? (
  //     // <Layout>
  //     <Component {...props} />
  //   ) : (
  //     // </Layout>
  //     <Navigate to="/login" />
  //   )
  //   // }
  // }
  // const PublicRoute = ({ component: Component }) => <Component />

  return (
    <React.Fragment>
      <Router>
        {/* <Routes>
          {userRoutes.map((route, idx) => (
            <Route key={idx} path={route.path} element={route.element} />
          ))}
        </Routes> */}
        <Routes>
          <Route element={<PrivateRoutes />}>
            {userRoutes.map((route, idx) => (
              <Route
                key={idx}
                path={route.path}
                element={route.element}
                exact
              />
            ))}
          </Route>
          {authRoutes.map((route, idx) => (
            <Route key={idx} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any,
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

export default connect(mapStateToProps, null)(App)
