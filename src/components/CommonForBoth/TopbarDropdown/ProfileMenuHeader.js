import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
// Redux
import { connect } from "react-redux"
import { Link } from "react-router-dom"

// users
import user4 from "../../../assets/images/users/avatar-4.jpg"

import hand from "../../../assets/images/hand.PNG"
import polygon from "../../../assets/images/Polygon.png"
import logout from "../../../assets/images/logout.svg"

const ProfileMenuHeader = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)

  const [username, setusername] = useState("Admin")

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const obj = JSON.parse(localStorage.getItem("authUser"))
        setusername(obj.displayName)
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        const obj = JSON.parse(localStorage.getItem("authUser"))
        if (obj.username) {
          setusername(obj.username)
        } else {
          setusername(obj.name)
        }
      }
    }
  }, [props.success])

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect d-flex align-items-center"
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={user4}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ms-1 fw-medium font-size-15">
            <h6 className="mb-0 d-flex align-items-center">
              Welcome Jill
            </h6>
          </span>{" "}
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href="/my-account" className="profile-header">
            {" "}
           My Account <img src={polygon} />
          </DropdownItem>

          <div className="profile-center">
            <DropdownItem tag="a" href="/user-management">
             User Management
            </DropdownItem>
            <DropdownItem tag="a" href="/change-password">
             Change Password
            </DropdownItem>
            <DropdownItem tag="a" href="/security-settings">
             Security Settings
            </DropdownItem>
          </div>
          <div className="profile-header">
            <Link
              to="/logout"
              className="dropdown-item p-0 d-flex align-items-center"
            >
              <img src={logout} />
              <span>Log Out</span>
            </Link>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

ProfileMenuHeader.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default connect(mapStatetoProps, null)(ProfileMenuHeader)
