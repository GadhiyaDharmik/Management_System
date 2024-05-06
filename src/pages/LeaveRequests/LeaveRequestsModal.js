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

//Monts
// import months from '../../../common/data/calender'

import Flatpickr from "react-flatpickr"
import { Formik, useFormik } from "formik"
import * as Yup from "yup"
import { isEmpty } from "lodash"
import { isElement } from "lodash"

// Custom Style of Select Fields
// const customStyles = {
//   control: base => ({
//     ...base,
//     height: "56px",
//     border: "0px",
//   }),
// }

const customStyles = {
  control: base => ({
    ...base,
    border: "1px",
  }),
}


const LeaveFromModal = ({ show, onCloseClick, id }) => {
  const [leaveFromDate, setLeaveFromDate] = React.useState("")

  const [leaveDate, setLeaveDate] = React.useState("")

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      leaveFrom: "",
    },

    validationSchema: Yup.object({
      leaveFrom: Yup.string("Enter your Leave Date").required(
        "Please Enter A Leave Date"
      ),
    }),
    onSubmit: (values, resetForm) => {
      console.log(values)
      onCloseClick()
      resetForm()
    },
  })

  const handleCancel = () => {
    validation.resetForm()
    onCloseClick()
  }

  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalHeader>Leave From</ModalHeader>
      <ModalBody className="py-3 px-5">
        <Form
          className="form-horizontal floating-form my-account"
          onSubmit={e => {
            e.preventDefault()
            validation.handleSubmit()
            return false
          }}
        >
          <Row>
            <Col lg={12}>
              <div className="mb-3">
                <FormGroup floating>
                  <Input
                    type="date"
                    id="leaveFrom"
                    name="leaveFrom"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.leaveFrom || ""}
                    invalid={
                      validation.touched.leaveFrom &&
                      validation.errors.leaveFrom
                        ? true
                        : false
                    }
                    style={{
                      border: `${
                        validation.touched.leaveFrom &&
                        validation.errors.leaveFrom
                          ? "solid 1px #ff6666"
                          : ""
                      }`,
                    }}
                    placeholder="User Name"
                  />
                  <Label
                    for="leaveFrom"
                    style={{
                      color: `${
                        validation.touched.leaveFrom &&
                        validation.errors.leaveFrom
                          ? "#ff6666"
                          : ""
                      }`,
                    }}
                  >
                    Choose Leave From Date
                  </Label>
                  {validation.touched.leaveFrom &&
                  validation.errors.leaveFrom ? (
                    <FormFeedback type="invalid">
                      {validation.errors.leaveFrom}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </div>
            </Col>
            <Col>
              <div className="text-center mt-3">
                <button type="submit" className="btn bg-success btn-lg ms-2">
                  {id ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  className="btn bg-danger btn-lg ms-2"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  )
}
const LeaveToModal = ({ show, onCloseClick, id }) => {
  const [leaveToDate, setLeaveToDate] = React.useState("")

  const [leaveDate, setLeaveDate] = React.useState("")

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      leaveTo: "",
    },

    validationSchema: Yup.object({
      leaveTo: Yup.string("Enter your Leave Date").required(
        "Please Enter A Leave Date"
      ),
    }),
    onSubmit: (values, resetForm) => {
      console.log(values)
      onCloseClick()
      resetForm()
    },
  })
  const handleCancel = () => {
    validation.resetForm()
    onCloseClick()
  }

  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalHeader>Leave To</ModalHeader>

      <ModalBody className="py-3 px-5">
        <Form
          className="form-horizontal floating-form my-account"
          onSubmit={e => {
            e.preventDefault()
            validation.handleSubmit()
            return false
          }}
        >
          <Row>
            <Col lg={12}>
              <div className="mb-3">
                <FormGroup floating>
                  <Input
                    type="date"
                    id="leaveTo"
                    name="leaveTo"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.leaveTo || ""}
                    invalid={
                      validation.touched.leaveTo && validation.errors.leaveTo
                        ? true
                        : false
                    }
                    style={{
                      border: `${
                        validation.touched.leaveTo && validation.errors.leaveTo
                          ? "solid 1px #ff6666"
                          : ""
                      }`,
                    }}
                    placeholder="User Name"
                  />
                  <Label
                    for="leaveTo"
                    style={{
                      color: `${
                        validation.touched.leaveTo && validation.errors.leaveTo
                          ? "#ff6666"
                          : ""
                      }`,
                    }}
                  >
                    Choose Leave To Date
                  </Label>
                  {validation.touched.leaveTo && validation.errors.leaveTo ? (
                    <FormFeedback type="invalid">
                      {validation.errors.leaveTo}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </div>
            </Col>
            <Col>
              <div className="text-center mt-3">
                <button type="submit" className="btn bg-success btn-lg ms-2">
                  {id ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  className="btn bg-danger btn-lg ms-2"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  )
}

const notifyedPersonNames = [
  {
    label: "Priya Patel",
    email: "priyapatel000@gmail.com",
  },
  {
    label: "Ravi Vekariya",
    email: "ravipatel000@gmail.com",
  },
  {
    label: "Kishan Kodhiya",
    email: "kishanpatel000@gmail.com",
  },
]

const shiftTypes = [
  { label: "First Half", value: "First Half" },
  { label: "Seconde Half", value: "Seconde Half" },
]
const leaveTypes = [
  { label: "Casual Leave (CL)", value: "Casual Leave (CL)" },
  { label: "Sick Leave (SL)", value: "Sick Leave (SL)" },
  { label: "Maternity Leave (ML)", value: "Maternity Leave (ML)" },
  { label: "Marriage Leave", value: "Marriage Leave" },
]
const LeaveModal = ({ show, onCloseClick, id }) => {
  // const { register, handleSubmit, errors } = useForm()

  const [leaveFromDate, setLeaveFromDate] = React.useState("")
  const [leaveToDate, setLeaveToDate] = React.useState("")
  const [errors, setErrors] = React.useState(false)

  const [shiftFromType, setShiftFromType] = React.useState("Full Day")
  const [shiftToType, setShiftToType] = React.useState("Full Day")
  const [leaveType, setLeaveType] = React.useState(leaveTypes[1].label)

  //Shift
  // const [selctedValues, setSelctedValues] = React.useState({
  //   shiftFromType: "Full Day",
  //   shiftToType: "Full Day",
  //   leaveType:"",
  // })

  const [open, setOpen] = React.useState(onCloseClick)
  const [notifyedPersonEmails, setNotifyedPersonEmail] = React.useState([])
  const [items, setItem] = React.useState({
    options: [
      { name: "Option 1", id: 1 },
      { name: "Option 2", id: 2 },
    ],
  })
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      leaveFrom: leaveFromDate,
      leaveTo: leaveToDate,
      shiftFromType: shiftFromType,
      shiftToType: shiftToType,
      leaveType: leaveType,
      resone: "",
      notify: notifyedPersonEmails ?? [],
    },

    validationSchema: Yup.object({
      leaveFrom: Yup.string("Please Enter your leaveFrom").required(
        "Please Enter A leaveFrom"
      ),
      // leaveTo: Yup.string("Please Enter your Leave To Date").required(
      //   "Please Enter A Leave To Date"
      // ),
      // shiftFromType: Yup.string("Please Enter your Shift From Date").required(
      //   "Please Enter A Shift From Date"
      // ),
      // shiftToType: Yup.string("Please Enter your Shift To Date").required(
      //   "Please Enter A Shift To Date"
      // ),
      // shiftType: Yup.string("Please Select Your your Shift").required(
      //   "Please Select Your Must Enter A Shift"
      // ),
      // leaveType: Yup.string("Please Select Your Leave Type").required(
      //   "Please Select Your Leave Type"
      // ),
      resone: Yup.string("Please Enter your resone").required(
        "Please Enter Your Leave Discription"
      ),
    }),
    onSubmit: (values, resetForm) => {
      console.log(values)
      resetForm()
    },
  })

  const handleClose = () => {
    validation.resetForm()
    setOpen(onCloseClick)
  }

  //set Selected Dates
  const handleDatepicker = (event, picker) => {
    setLeaveFromDate(picker.startDate.format("D MMMM YYYY"))
    setLeaveToDate(picker.endDate.format("D MMMM YYYY"))
  }

  const changeNotify = data => {
    let labels = notifyedPersonNames.map(ele => ele.label)
    let value = data.map(val => notifyedPersonNames[labels.indexOf(val)].email)
    setNotifyedPersonEmail(value)
  }
  const handleDatepickerValidation = () => {
    if (leaveFromDate || leaveToDate == "") {
      setErrors(true)
    } else {
      setErrors(false)
    }
  }
  // const handleSubmitChange = () => {
  //   if (leaveFromDate || notifyedPersonName == "" || undefined || null) {
  //     setErrors(true)
  //   } else {
  //     set(false)
  //   }
  // }

  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalHeader>{id ? "Update" : "Add"} LeaveRequests</ModalHeader>
      <ModalBody>
        <Form
          className="form-horizontal floating-form my-account"
          onSubmit={e => {
            e.preventDefault()
            validation.handleSubmit()
            return false
          }}
        >
          <Row className="">
            <Col lg={12}>
              <DateRangePicker
                onApply={(event, picker) => handleDatepicker(event, picker)}
              >
                <input
                  name="leaveFrom"
                  style={{
                    border: `1px solid ${
                      validation.touched.leaveFrom &&
                      validation.errors.leaveFrom
                        ? "red"
                        : "transperant"
                    }`,
                  }}
                  onChange={() => handleDatepickerValidation()}
                  type="text"
                  className="form-control fw-bold"
                />
                {/* {errors.leaveFrom && <p>Your name is not Leave From</p>} */}
              </DateRangePicker>
              {validation.touched.leaveFrom && validation.errors.leaveFrom ? (
                <p style={{ color: "red" }}>{validation.errors.leaveFrom}</p>
              ) : null}
              {/* {errors ? (
                <p>Please Select A Leaves Dates</p>
              // ) : null} */}
            </Col>
            <span className="text-secondary">
              Note:- Hear Select Your going to coming sift (go to First half and
              coming on Second Half)
            </span>
            <Col md="6">
              <FormGroup>
                <Select
                  name="shiftFromType"
                  classNamePrefix="select-v1"
                  options={shiftTypes}
                  // defaultValue={{ label: "Full Day", value: "fullday" }}
                  onChange={e => {
                    setShiftFromType(e.value)
                  }}
                  styles={customStyles}
                  placeholder="From Shift"
                />
              </FormGroup>
            </Col>
            {/* <Col lg={6} sm={6}>
              <FormGroup floating>
                <Label for="shiftFromType">Shift From</Label>
                <Select
                  name="shiftFromType"
                  classNamePrefix="select-v1"
                  options={shiftTypes}
                  defaultValue={{ label: "Full Day", value: "fullday" }}
                  onChange={e => {
                    setShiftFromType(e.value)
                  }}
                  styles={customStyles}
                  placeholder="From Shift"
                />
              </FormGroup>
            </Col> */}
            <Col md={6}>
              {/* <FormGroup floating>
                <Select
                  name="shiftToType"
                 
                  // defaultValue={{ label: "Full Day", value: "fullday" }}

                  styles={customStyles}
                  classNamePrefix="select-v1"
                  // defaultValue={{ label: "Full Day", value: "fullday" }}
                  placeholder="From Type"
                />
              </FormGroup> */}
              <FormGroup floating>
                <Select
                  name="shiftToType"
                  classNamePrefix="select-v1"
                  options={shiftTypes}
                  // defaultValue={{ label: "Full Day", value: "fullday" }}
                  onChange={e => {
                    setShiftToType(e.value)
                  }}
                  styles={customStyles}
                  placeholder="Select Month"
                />
              </FormGroup>
            </Col>
            <span className="text-secondary">
              Note:- Hear Select Your Leave Type (Leave For Marriage...)
            </span>
            <Col lg={12}>
              <FormGroup floating>
                <Label for="leaveType">leaveType</Label>
                <Select
                  name="leaveType"
                  classNamePrefix="select-v1"
                  options={leaveTypes}
                  onChange={e => {
                    setLeaveType(e.value)
                  }}
                  styles={customStyles}
                  placeholder="Leave Types"
                />
              </FormGroup>
            </Col>
            <Col lg={12}>
              <Multiselect
                className="border-transparent fw-bold"
                isObject={false}
                name="notify"
                onSelect={params => changeNotify(params)}
                options={notifyedPersonNames?.map(item => item.label)}
                id="css_custom"
                closeIcon="close"
                style={{
                  chips: { background: "gray", borderRadius: "5px" },
                  searchBox: {
                    border: "none",
                    borderRadius: "10px",
                    backgroundColor: "#F8F8FA",
                  },
                }}
              />
            </Col>
            <Col lg={12} className="mt-3">
              <FormGroup floating>
                <Input
                  type="textarea"
                  id="resone"
                  name="resone"
                  className="fw-bold"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.resone || ""}
                  invalid={
                    validation.touched.resone && validation.errors.resone
                      ? true
                      : false
                  }
                  style={{
                    border: `${
                      validation.touched.resone && validation.errors.resone
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                  }}
                  placeholder="Discription"
                />
                <Label
                  for="resone"
                  style={{
                    color: `${
                      validation.touched.resone && validation.errors.resone
                        ? "#ff6666"
                        : ""
                    }`,
                  }}
                >
                  Discription
                </Label>
                {validation.touched.resone && validation.errors.resone ? (
                  <FormFeedback type="invalid">
                    {validation.errors.resone}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="text-center mt-3">
                <button
                  type="submit"
                  // onClick={handleSubmitChange}
                  className="btn bg-success btn-lg ms-2"
                >
                  {id ? "Update Leave" : "Add Leave"}
                </button>
                <button
                  type="button"
                  className="btn bg-danger btn-lg ms-2"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  )
}
const LeaveReasonModal = ({ show, onCloseClick, id }) => {
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      resone: "",
    },

    validationSchema: Yup.object({
      resone: Yup.string("Enter your resone").required(
        "You Must Enter A resone"
      ),
    }),
    onSubmit: (values, resetForm) => {
      console.log(values)
      resetForm()
    },
  })
  const handleCancel = () => {
    validation.resetForm()
    onCloseClick()
  }

  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalHeader>Leave Reason</ModalHeader>
      <ModalBody>
        <Row>
          <Col lg={12}>
            <FormGroup floating>
              <Input
                type="textarea"
                id="resone"
                name="resone"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.resone || ""}
                invalid={
                  validation.touched.resone && validation.errors.resone
                    ? true
                    : false
                }
                style={{
                  border: `${
                    validation.touched.resone && validation.errors.resone
                      ? "solid 1px #ff6666"
                      : ""
                  }`,
                }}
                placeholder="User Name"
              />
              <Label
                for="resone"
                style={{
                  color: `${
                    validation.touched.resone && validation.errors.resone
                      ? "#ff6666"
                      : ""
                  }`,
                }}
              >
                leave reasone
              </Label>
              {validation.touched.resone && validation.errors.resone ? (
                <FormFeedback type="invalid">
                  {validation.errors.resone}
                </FormFeedback>
              ) : null}
            </FormGroup>{" "}
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="text-center mt-3">
              <button type="submit" className="btn bg-success btn-lg ms-2">
                {id ? "Update Reasone" : "Add Reasone"}
              </button>
              <button
                type="button"
                style={{ backgroundColor: "#6062F9" }}
                className="btn bg-danger btn-lg ms-2"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}
const ChangeRequestStatus = ({ show, onCloseClick }) => {
  // const [requestStatus, setRequestStatus] = React.useState("")
  const [openStatus, setOpenStatus] = React.useState(onCloseClick)

  const onApprovedClick = () => {
    console.log("Approved")
    setOpenStatus(onCloseClick)
  }
  const onRejectClick = () => {
    console.log("Rejected")
    setOpenStatus(onCloseClick)
  }
  return (
    <Modal isOpen={show} toggle={openStatus} centered={true}>
      <ModalBody className="py-3 px-5">
        <Row>
          <Col lg={12}>
            <div className="text-center">
              <i
                className="mdi mdi-alert-circle-outline"
                style={{ fontSize: "9em", color: "orange" }}
              />
              <h2>Are you sure?</h2>
              <h4>{"You won't be able to change this!"}</h4>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-success btn-lg ms-2"
                onClick={onApprovedClick}
              >
                Yes, Approved it!
              </button>
              <button
                type="button"
                className="btn btn-danger btn-lg ms-2"
                onClick={onRejectClick}
              >
                Yes, Reject it!
              </button>
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

LeaveReasonModal.propTypes = {
  onCloseClick: PropTypes.func,
  show: PropTypes.any,
}
LeaveModal.propTypes = {
  onCloseClick: PropTypes.func,
  show: PropTypes.any,
}
LeaveFromModal.propTypes = {
  onCloseClick: PropTypes.func,
  show: PropTypes.any,
}
LeaveToModal.propTypes = {
  onCloseClick: PropTypes.func,
  show: PropTypes.any,
}

ChangeRequestStatus.propTypes = {
  onCloseClick: PropTypes.func,
  show: PropTypes.any,
}
export {
  LeaveModal,
  LeaveFromModal,
  LeaveToModal,
  LeaveReasonModal,
  ChangeRequestStatus,
}

{
  /* <Col lg={6}>
              <FormGroup floating>
                <Input
                  type="text"
                  id="leaveFrom"
                  name="leaveFrom"
                  className="fw-bold disabled"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.leaveFrom || ""}
                  invalid={
                    validation.touched.leaveFrom && validation.errors.leaveFrom
                      ? true
                      : false
                  }
                  style={{
                    border: `${
                      validation.touched.leaveFrom &&
                      validation.errors.leaveFrom
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                  }}
                  placeholder="Leave From"
                />
                <Label
                  for="leaveFrom"
                  style={{
                    color: `${
                      validation.touched.leaveFrom &&
                      validation.errors.leaveFrom
                        ? "#ff6666"
                        : ""
                    }`,
                  }}
                >
                  Leave From
                </Label>
                {validation.touched.leaveFrom && validation.errors.leaveFrom ? (
                  <FormFeedback type="invalid">
                    {validation.errors.leaveFrom}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Col lg={6}>
              <FormGroup floating>
                <Input
                  type="text"
                  id="leaveTo"
                  name="leaveTo"
                  className="fw-bold"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.leaveTo || ""}
                  invalid={
                    validation.touched.leaveTo && validation.errors.leaveTo
                      ? true
                      : false
                  }
                  style={{
                    border: `${
                      validation.touched.leaveTo && validation.errors.leaveTo
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                  }}
                  placeholder="Leave To"
                />
                <Label
                  for="leaveTo"
                  style={{
                    color: `${
                      validation.touched.leaveTo && validation.errors.leaveTo
                        ? "#ff6666"
                        : ""
                    }`,
                  }}
                >
                  Leave To
                </Label>
                {validation.touched.leaveTo && validation.errors.leaveTo ? (
                  <FormFeedback type="invalid">
                    {validation.errors.leaveTo}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col> */
}

//shift field
{
  /* <Col lg={6}>
              <FormGroup floating>
                <Input
                  type="select"
                  id="shiftFromType"
                  bsSize="lg"
                  name="shiftFromType"
                  className="w-100 text-start ps-3 pt-3 fw-bold"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.shiftFromType || ""}
                  styles={customStyles}
                  invalid={
                    validation.touched.shiftFromType &&
                    validation.errors.shiftFromType
                      ? true
                      : false
                  }
                  style={{
                    backgroundColor: "#F8F8FA",
                    border: `${
                      validation.touched.shiftFromType &&
                      validation.errors.shiftFromType
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                    borderRadius: "15px",
                    padding: "1px",
                  }}
                  placeholder="Shifts"
                >
                  <option value="fullday">Fullday</option>
                  {shiftTypes.map((ele, index) => (
                    <option value={ele.value} key={index}>
                      {ele.label}
                    </option>
                  ))}
                </Input>
                <Label for="shiftFromType">From Shifts</Label>
                {validation.touched.shiftFromType &&
                validation.errors.shiftFromType ? (
                  <FormFeedback type="invalid">
                    {validation.errors.shiftFromType}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col> */
}

{
  /* <FormGroup floating>
                <Input
                  type="select"
                  id="leaveType"
                  bsSize="lg"
                  name="leaveType"
                  className="w-100 text-start ps-3 pt-3 fw-bold"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.leaveType || ""}
                  styles={customStyles}
                  invalid={
                    validation.touched.leaveType && validation.errors.leaveType
                      ? true
                      : false
                  }
                  style={{
                    backgroundColor: "#F8F8FA",
                    border: `${
                      validation.touched.leaveType &&
                      validation.errors.leaveType
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                    borderRadius: "15px",
                    padding: "1px",
                  }}
                  placeholder="To Shifts"
                >
                  <option value="other">Other</option>
                  {leaveTypes.map((ele, index) => (
                    <option value={ele.value} key={index}>
                      {ele.label}
                    </option>
                  ))}
                </Input>
                <Label for="leaveType">Leave Type</Label>
                {validation.touched.leaveType && validation.errors.leaveType ? (
                  <FormFeedback type="invalid">
                    {validation.errors.leaveType}
                  </FormFeedback>
                ) : null}
              </FormGroup> */
}
