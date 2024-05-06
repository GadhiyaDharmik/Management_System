import PropTypes from "prop-types"
import React, { useState } from "react"

import { connect } from "react-redux"
import { Form, Input, Button, Row, Col, Badge } from "reactstrap"

import { Link } from "react-router-dom"

// Reactstrap
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap"

// Import menuDropdown
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown"
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown"
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu"

import logoSm from "../../assets/images/logo.png"
import logoDark from "../../assets/images/logo-dark.png"
import logoLight from "../../assets/images/logo-light.png"

// import images
import github from "../../assets/images/brands/github.png"
import bitbucket from "../../assets/images/brands/bitbucket.png"
import dribbble from "../../assets/images/brands/dribbble.png"
import dropbox from "../../assets/images/brands/dropbox.png"
import mail_chimp from "../../assets/images/brands/mail_chimp.png"
import slack from "../../assets/images/brands/slack.png"
import user from "../../assets/images/user.png"
import hand from "../../assets/images/hand.PNG"
import top from "../../assets/images/top-btn.png"
//i18n
import { withTranslation } from "react-i18next"

import ProfileMenuHeader from "../CommonForBoth/TopbarDropdown/ProfileMenuHeader"

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
} from "../../store/actions"

const Header = props => {
  const [search, setsearch] = useState(false)
  const [socialDrp, setsocialDrp] = useState(false)
  const [status, setStatus] = useState("Clock In")
  // const [time, setTime] = useState("")
  var time = new Date(new Date().getTime()).toLocaleTimeString()

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        )
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      }
    }
  }

  function tToggle() {
    var body = document.body
    body.classList.toggle("vertical-collpsed")
    body.classList.toggle("sidebar-enable")
  }

  // function time(){
  //   return time
  // }
  // React.useEffect(() => {

  //   setInterval(() => {
  //     time()
  //   }, 1000)
  // }, [status])

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <button
            type="button"
            onClick={() => {
              tToggle()
            }}
            className="btn btn-sm px-3 font-size-16 header-item waves-effect vertical-menu-btn"
            id="vertical-menu-btn"
          >
            <i className="fa fa-fw fa-bars" />
          </button>

          <div className="user-content d-flex" style={{ width: "40%" }}>
            <ProfileMenuHeader />
          </div>

          <div
            className="top-right-content d-flex flex-row-reverse ml-lg-6"
            style={{ width: "70%" }}
          >
            {/* <NotificationDropdown /> */}
            <Badge
              className={
                "badge badge-pill bg-pill fs-2 ps-4 pe-4 pt-3 pb-3 bg-soft-" +
                (status === "Clock Out" ? "success" : "primary")
              }
              style={{ cursor: "pointer" }}
              onClick={() =>
                setStatus(status == "Clock In" ? "Clock Out" : "Clock In")
              }
            >
              <span className="fs-4"> {status}</span>
            </Badge>
            <span className="fs-3 pe-3">
              {status == "Clock Out" ? time : ""}
            </span>
            {/* <Time/> */}
          </div>
          {/* <div className='top-right-content d-flex ml-lg-3'>
            <NotificationDropdown />
            <Link to="/" className='top-btn ml-5'>
              <img src={top} />
              Add service

            </Link>
          </div> */}
        </div>
      </header>
    </React.Fragment>
  )
}

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
}

const mapStatetoProps = state => {
  const { layoutType, showRightSidebar, leftMenu, leftSideBarType } =
    state.Layout
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType }
}

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header))
