import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import SidebarContent from "./SidebarContent"

import logoSm from "../../assets/images/Group 427318200 (1).png"
import logo from "../../assets/images/logo 123.png"
import logoLight from "../../assets/images/logo-light.png"

const Sidebar = props => {
  function tToggle() {
    var body = document.body
    body.classList.toggle("vertical-collpsed")
    body.classList.toggle("sidebar-enable")
  }

  return (
    <React.Fragment>
      <div className="vertical-menu" style={{ position: "fixed" }}>
        <div className="navbar-brand-box">
          <Link to="/" className="logo logo-dark">
            <span className="logo-lg">
              <img src={logo} alt="" height="35" />
            </span>
          </Link>
        </div>
        <Link to="/" className="logo logo-dark mt-5">
          <span className="logo-sm m-3 text-center">
            <img src={logoSm} alt="" height="43px" />
          </span>
        </Link>
        <button
          onClick={() => {
            tToggle()
          }}
          type="button"
          className="btn btn-sm px-3 font-size-16 header-item waves-effect vertical-menu-btn"
        >
          <i className="fa fa-fw fa-bars"></i>
        </button>
        <div className="sidebar-menu-scroll pt-4">
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>
      </div>
    </React.Fragment>
  )
}

Sidebar.propTypes = {
  type: PropTypes.string,
}

const mapStatetoProps = state => {
  return {
    layout: state.Layout,
  }
}
export default connect(mapStatetoProps, null)(Sidebar)
