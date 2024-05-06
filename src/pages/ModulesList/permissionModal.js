import PropTypes from "prop-types"
import React from "react"
import {
  Col,
  Modal,
  ModalBody,
  Row,
  Input,
  Label,
  FormGroup,
  Form,
  FormFeedback,
  InputGroup,
  ModalHeader,
} from "reactstrap"

import Select from "react-select"

// Date Range Picker
import DateRangePicker from "react-bootstrap-daterangepicker"

//Form Validation
// import useForm from "react-hook-form"

//Chips
import { Chips, Chip } from "react-chips"
import Multiselect from "multiselect-react-dropdown"

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-daterangepicker/daterangepicker.css"

// import "react-datepicker/src/stylesheets/datepicker.scss";

// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file

const ModulePermissionList = ({ show, onCloseClick, permissions }) => {


  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalHeader toggle={onCloseClick}>Permissions</ModalHeader>
      <ModalBody className="py-3 px-5">
        {permissions.permissions.map((ele, index) => (
          <Row key={index} className="g-5">
            <Col className="fw-bold fs-5 border p-3">{ele.permissionName}</Col>
          </Row>
        ))}
      </ModalBody>
    </Modal>
  )
}

ModulePermissionList.propTypes = {
  onCloseClick: PropTypes.func,
  show: PropTypes.any,
  permissions: PropTypes.any,
}
export { ModulePermissionList }
