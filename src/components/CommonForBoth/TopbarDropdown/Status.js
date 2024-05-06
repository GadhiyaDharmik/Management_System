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
// Redux
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { ManageI } from "../../Common/CommonSvg"

// users
import user4 from "../../../assets/images/users/avatar-4.jpg"

const Status = props => {
  // Declare a new state variable, which we'll call "menu"
  const { toggleModal } = props
  const [menu, setMenu] = useState(false)

  const [username, setusername] = useState("")

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

  const [modal_backdrop, setmodal_backdrop] = useState(false)

  function tog_backdrop() {
    // setmodal_backdrop(!modal_backdrop)
    // removeBodyCss()
    toggleModal()
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding")
  }

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block table-status"
      >
        <DropdownToggle
          className="btn header-item waves-effect btn-"
          id="page-header-user-dropdown"
          tag="button"
        >
          <ManageI />
          <span className="d-none d-xl-inline-block ms-1 fw-medium font-size-15"></span>{" "}
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <div className="radio-btn">
            <div className="form-check form-check-inline">
              <Input
                type="radio"
                id="customRadioInline1"
                name="customRadioInline1"
                className="form-check-input"
              />
              <Label className="form-check-label" htmlFor="customRadioInline1">
                <span className="badge badge-pill bg-pill font-size-12 bg-soft-success badge bg-secondary">
                  Active
                </span>
              </Label>
            </div>
          </div>
          <div className="radio-btn">
            <div className="form-check form-check-inline">
              <Input
                type="radio"
                id="customRadioInline2"
                name="customRadioInline1"
                className="form-check-input"
              />
              <Label className="form-check-label" htmlFor="customRadioInline2">
                <span className="badge badge-pill bg-pill font-size-12  badge bg-secondary bg_suspend">
                  Suspended
                </span>
              </Label>
            </div>
          </div>
          <div className="radio-btn">
            <div className="form-check form-check-inline">
              <Input
                type="radio"
                id="customRadioInline3"
                name="customRadioInline1"
                className="form-check-input"
              />
              <Label className="form-check-label" htmlFor="customRadioInline3">
                <span className="badge badge-pill bg-pill font-size-12  badge bg-secondary bg-soft-danger">
                  Suspended
                </span>
              </Label>
            </div>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

Status.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default connect(mapStatetoProps, null)(Status)
