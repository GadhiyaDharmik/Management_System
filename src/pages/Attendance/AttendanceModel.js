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
  FormFeedback,
  ModalHeader,
  Form,
} from "reactstrap"
import { Formik, useFormik } from "formik"
import * as Yup from "yup"

//Attendance Update Modal

const AttendanceModal = ({ show, onCloseClick, id }) => {
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      checkIn: "",
      checkOut: "",
      resone: "",
    },

    validationSchema: Yup.object({
      checkIn: Yup.string("Enter your checkIn").required(
        "Please Enter A Check in"
      ),
      checkOut: Yup.string("Enter your Check Out Time").required(
        "Please Enter A Check in"
      ),
      resone: Yup.string("Please Enter A Valid Resone").required(
        "Please Enter A Resone"
      ),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values)
      resetForm()
    },
  })
  const handleClick = () => {
    onCloseClick()
    validation.resetForm()
  }
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalHeader>Update Attendance</ModalHeader>
      <ModalBody>
        <Form
          className="form-horizontal floating-form my-account"
          onSubmit={e => {
            e.preventDefault()
            validation.handleSubmit()
            return false
          }}
        >
          <Row>
            <Col lg={6}>
              <FormGroup floating>
                <Input
                  type="time"
                  id="checkIn"
                  name="checkIn"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.checkIn || ""}
                  invalid={
                    validation.touched.checkIn && validation.errors.checkIn
                      ? true
                      : false
                  }
                  style={{
                    border: `${
                      validation.touched.checkIn && validation.errors.checkIn
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                  }}
                  placeholder="User Name"
                />
                <Label
                  for="checkIn"
                  style={{
                    color: `${
                      validation.touched.checkIn && validation.errors.checkIn
                        ? "#ff6666"
                        : ""
                    }`,
                  }}
                >
                  Check In
                </Label>
                {validation.touched.checkIn && validation.errors.checkIn ? (
                  <FormFeedback type="invalid">
                    {validation.errors.checkIn}
                  </FormFeedback>
                ) : null}
              </FormGroup>{" "}
            </Col>
            <Col lg={6}>
              <FormGroup floating>
                <Input
                  type="time"
                  id="checkOut"
                  name="checkOut"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.checkOut || ""}
                  invalid={
                    validation.touched.checkOut && validation.errors.checkOut
                      ? true
                      : false
                  }
                  style={{
                    border: `${
                      validation.touched.checkOut && validation.errors.checkOut
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                  }}
                  placeholder="User Name"
                />
                <Label
                  for="checkOut"
                  style={{
                    color: `${
                      validation.touched.checkOut && validation.errors.checkOut
                        ? "#ff6666"
                        : ""
                    }`,
                  }}
                >
                  Check Out
                </Label>
                {validation.touched.checkOut && validation.errors.checkOut ? (
                  <FormFeedback type="invalid">
                    {validation.errors.checkOut}
                  </FormFeedback>
                ) : null}
              </FormGroup>{" "}
            </Col>
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
                  Resone
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
                <button type="submit" className="btn btn-success btn-lg ms-2">
                  {id ? "Update Attendance" : "Add Attendance"}
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-lg ms-2"
                  onClick={handleClick}
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

//Attendance Update Check In Modal

const AttendanceChackInModal = ({ show, onCloseClick }) => {
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      checkIn: "",
    },

    validationSchema: Yup.object({
      checkIn: Yup.string("Enter your Check In Time").required(
        "Please Enter A check in"
      ),
    }),
    onSubmit: (values, resetForm) => {
      console.log(values)
      onCloseClick()
      resetForm()
    },
  })
  const handleClick = () => {
    onCloseClick()
    validation.resetForm()
  }
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalHeader>Update Chack In</ModalHeader>
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
              <FormGroup floating>
                <Input
                  type="time"
                  id="checkIn"
                  name="checkIn"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.checkIn || ""}
                  invalid={
                    validation.touched.checkIn && validation.errors.checkIn
                      ? true
                      : false
                  }
                  style={{
                    border: `${
                      validation.touched.checkIn && validation.errors.checkIn
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                  }}
                  placeholder="User Name"
                />
                <Label
                  for="checkIn"
                  style={{
                    color: `${
                      validation.touched.checkIn && validation.errors.checkIn
                        ? "#ff6666"
                        : ""
                    }`,
                  }}
                >
                  Check In
                </Label>
                {validation.touched.checkIn && validation.errors.checkIn ? (
                  <FormFeedback type="invalid">
                    {validation.errors.checkIn}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="text-center mt-3">
                <button type="submit" className="btn bg-success btn-lg ms-2">
                  Update
                </button>
                <button
                  type="button"
                  className="btn bg-danger btn-lg ms-2"
                  onClick={handleClick}
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

//Attendance Update Check Out Modal

const AttendanceChackOutModal = ({ show, onCloseClick }) => {
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      checkOut: "",
    },

    validationSchema: Yup.object({
      checkOut: Yup.string("Enter your Check Out Time").required(
        "Please Enter A check in"
      ),
    }),
    onSubmit: (values, resetForm) => {
      console.log(values)
      resetForm()
    },
  })
  const handleClick = () => {
    onCloseClick()
    validation.resetForm()
  }
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalHeader>Update Chack Out</ModalHeader>
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
              <FormGroup floating>
                <Input
                  type="time"
                  id="checkOut"
                  name="checkOut"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.checkOut || ""}
                  invalid={
                    validation.touched.checkOut && validation.errors.checkOut
                      ? true
                      : false
                  }
                  style={{
                    border: `${
                      validation.touched.checkOut && validation.errors.checkOut
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                  }}
                  placeholder="User Name"
                />
                <Label
                  for="checkOut"
                  style={{
                    color: `${
                      validation.touched.checkOut && validation.errors.checkOut
                        ? "#ff6666"
                        : ""
                    }`,
                  }}
                >
                  Check Out
                </Label>
                {validation.touched.checkOut && validation.errors.checkOut ? (
                  <FormFeedback type="invalid">
                    {validation.errors.checkOut}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="text-center mt-3">
                <button type="submit" className="btn btn-success btn-lg ms-2">
                  Update
                </button>
                <button
                  type="button"
                  className="btn bg-danger btn-lg ms-2"
                  onClick={handleClick}
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

//Attendance Status Modal
const ChangeAttendanceStatus = ({ show, onCloseClick }) => {
  const [attendanceStatus, setAttendanceStatus] = React.useState("Panding")
  const [openStatus, setOpenStatus] = React.useState(false)
  const onApprovedClick = () => {
    setAttendanceStatus("Approved")
    onCloseClick()
  }
  const onRejectClick = () => {
    setAttendanceStatus("Rejected")
    onCloseClick()
  }
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
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
              <div className="text-center">
                <i
                  className="mdi mdi-alert-circle-outline"
                  style={{ fontSize: "9em", color: "orange" }}
                />
                <h2>Are you sure?</h2>
                <h4>{"You won't be able to revert this!"}</h4>
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
        </Form>
      </ModalBody>
    </Modal>
  )
}

ChangeAttendanceStatus.propTypes = {
  onCloseClick: PropTypes.func,
  show: PropTypes.any,
}
AttendanceModal.propTypes = {
  onCloseClick: PropTypes.func,
  show: PropTypes.any,
}
AttendanceChackInModal.propTypes = {
  onCloseClick: PropTypes.func,
  show: PropTypes.any,
}
AttendanceChackOutModal.propTypes = {
  onCloseClick: PropTypes.func,
  show: PropTypes.any,
}

export {
  AttendanceModal,
  AttendanceChackInModal,
  AttendanceChackOutModal,
  ChangeAttendanceStatus,
}
