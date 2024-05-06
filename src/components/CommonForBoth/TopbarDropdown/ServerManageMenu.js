import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Select from "react-select"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Modal,
  Form,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"

//to get ID
import { useParams } from "react-router-dom"


// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import { ManageI } from "../../Common/CommonSvg"

import manage1 from ".././../../assets/images/manage1.png"
import manage2 from ".././../../assets/images/manage2.png"
import manage3 from ".././../../assets/images/manage3.png"
import manage4 from ".././../../assets/images/manage4.png"
import manage5 from ".././../../assets/images/cancel.png"
import circle from ".././../../assets/images/x-circle.png"

// users
import user4 from "../../../assets/images/users/avatar-4.jpg"

const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"
  const { toggleModal, toggleModalCancel } = props
  const [menu, setMenu] = useState(false)

  const [username, setusername] = useState("manage")

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

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ]
  // console.log("profile menu", props)

  const [modal_backdrop, setmodal_backdrop] = useState(false)

  function tog_backdrop() {
    // setmodal_backdrop(!modal_backdrop)
    // removeBodyCss()
    toggleModal()
  }
  function tog_backdrop_cancel() {
    // setmodal_backdrop(!modal_backdrop)
    // removeBodyCss()
    toggleModalCancel()
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding")
  }

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect btn-manage"
          id="page-header-user-dropdown"
          tag="button"
        >
          <ManageI />
          <span className="d-none d-xl-inline-block ms-1 fw-medium font-size-15">
            manage
          </span>{" "}
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href={`/`}>
            {" "}
            <img src={manage1} alt="" />
            Change Password{" "}
          </DropdownItem>
          <DropdownItem tag="a" href={`/`}>
            <img src={manage2} alt="" />
            Update Details
          </DropdownItem>
          {/* <DropdownItem tag="a">
            <button
              type="button"
              className="p-0"
              onClick={() => {
                tog_backdrop()
              }}
              data-toggle="modal"
            >
              <img src={manage3} alt="" />
              Rescue Mode
            </button>
          </DropdownItem>
          <DropdownItem tag="a">
            <button
              type="button"
              className="p-0"
              onClick={() => {
                tog_backdrop_cancel()
              }}
              data-toggle="modal"
            >
              <img src={circle} alt="" />
              Cancel Server
            </button>
          </DropdownItem> */}
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default connect(mapStatetoProps, null)(ProfileMenu)

