import PropTypes from 'prop-types'
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { useNavigate } from 'react-router-dom'

import { logoutUser } from "../../store/actions"

const Logout = props => {
  const navigate=useNavigate()
  useEffect(() => {
    props.logoutUser(props.history)
    navigate("/login")
    window.localStorage.clear()
  })

  return <></>
}

Logout.propTypes = {
  history: PropTypes.object,
  logoutUser: PropTypes.func
}

export default connect(null, { logoutUser })(Logout)
