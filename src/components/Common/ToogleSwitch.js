import React, { useState } from "react"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { Row, Col, BreadcrumbItem } from "reactstrap"

const ToogleSwitch = props => {

  const [customchk, setcustomchk] = useState(true)
  const [toggleSwitch, settoggleSwitch] = useState(true)
  const [toggleSwitchSize, settoggleSwitchSize] = useState(true)

  return (
 <>
 <div className="form-check form-switch custom_switch">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customSwitch2"
                              defaultChecked
                              onClick={e => {
                                settoggleSwitch(!toggleSwitch)
                              }}
                            />                            
                          </div>
 </>
  )
}

ToogleSwitch.propTypes = {
  breadcrumbItem: PropTypes.string,
  breadcrumbImage: PropTypes.string,
  title: PropTypes.string
}

export default ToogleSwitch
