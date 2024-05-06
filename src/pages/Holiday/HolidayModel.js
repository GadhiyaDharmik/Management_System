import PropTypes from "prop-types"
import React from "react"
import {
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  FormFeedback,
} from "reactstrap"

// Date Range Picker
import DateRangePicker from "react-bootstrap-daterangepicker"
//Holiday Actions
import { addHoliday, updateHoliday } from "../../store/actions"

//Date Picker
import Flatpickr from "react-flatpickr"

// Formik Validation
import * as Yup from "yup"
import { Formik, useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"

const HolidayModel = ({ show, onCloseClick, id }) => {
  // const [open, setOpen] = React.useState(false)
  const dispatch = useDispatch()
  const [holidayDate, setHolidayDate] = React.useState("")
  const holidayListData = useSelector(
    state => state.holidayListData.holidayData
  )

  //Get All Shift
  const shiftList = useSelector(state => state.countrysData.shiftList).map(
    ele => {
      return { label: ele.shiftName, value: ele.id }
    }
  )
  // console.log(shiftList)

  //Get All Country
  const countrys = useSelector(state => state.countrysData.country).map(ele => {
    return { label: ele.name, value: ele.id }
  })

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      holiday: id ? holidayListData.holiday : "",
      holidayOn: id ? holidayListData.holidayOn : "",
      location: id ? holidayListData.location : "",
      details: id ? holidayListData.details : "",
      employeeShiftId: id ? holidayListData.employeeShiftId : 1,
      countryId: id ? holidayListData.countryId : 1,
    },
    validationSchema: Yup.object({
      holiday: Yup.string("Enter a holiday name").required(
        "Plaese Enter a holiday name"
      ),
      holidayOn: Yup.string("Enter a holiday date").required(
        "Plaese Enter a  holiday date"
      ),
      employeeShiftId: Yup.string("Enter a Employee Sift").required(
        "Plaese Enter a  holiday date"
      ),
      countryId: Yup.string("Enter a country").required(
        "Plaese Enter a  holiday date"
      ),
      location: Yup.string("Enter a holiday location").required(
        "Plaese Enter a  holiday location"
      ),
      details: Yup.string("Enter a holiday details").required(
        "Plaese Enter a  holiday details"
      ),
    }),
    onSubmit: (values, { resetForm }) => {
      if (id == "") {
        // console.log("add")
        dispatch(addHoliday(values))
      } else {
        console.log("update")

        dispatch(updateHoliday(id, values))
      }
      //  console.log(values)
      resetForm()
      onCloseClick()
    },
  })
  // const handleDatepicker = (event, picker) => {
  //   setHolidayDate(picker.startDate.format("D MMMM YYYY"))
  // }
  const handelCloseClick = () => {
    validation.resetForm()
    onCloseClick()
  }
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalHeader>{id ? "Update" : "Add"} Holiday Detail</ModalHeader>

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
            <Col lg="6">
              <FormGroup floating>
                <Input
                  type="text"
                  id="holiday"
                  name="holiday"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.holiday || ""}
                  invalid={
                    validation.touched.holiday && validation.errors.holiday
                      ? true
                      : false
                  }
                  style={{
                    border: `${
                      validation.touched.holiday && validation.errors.holiday
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                  }}
                  placeholder="User Name"
                />
                <Label
                  for="holiday"
                  style={{
                    color: `${
                      validation.touched.holiday && validation.errors.holiday
                        ? "#ff6666"
                        : ""
                    }`,
                  }}
                >
                  Holiday Name
                </Label>
                {validation.touched.holiday && validation.errors.holiday ? (
                  <FormFeedback type="invalid">
                    {validation.errors.holiday}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup floating>
                <Input
                  type="date"
                  id="holidayOn"
                  name="holidayOn"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.holidayOn || ""}
                  invalid={
                    validation.touched.holidayOn && validation.errors.holidayOn
                      ? true
                      : false
                  }
                  style={{
                    border: `${
                      validation.touched.holidayOn &&
                      validation.errors.holidayOn
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                  }}
                  placeholder="User Name"
                />
                <Label
                  for="holidayOn"
                  style={{
                    color: `${
                      validation.touched.holidayOn &&
                      validation.errors.holidayOn
                        ? "#ff6666"
                        : ""
                    }`,
                  }}
                >
                  Joining Date
                </Label>
                {validation.touched.holidayOn && validation.errors.holidayOn ? (
                  <FormFeedback type="invalid">
                    {validation.errors.holidayOn}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup floating>
                <Input
                  type="textarea"
                  id="location"
                  name="location"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.location || ""}
                  invalid={
                    validation.touched.location && validation.errors.location
                      ? true
                      : false
                  }
                  style={{
                    border: `${
                      validation.touched.location && validation.errors.location
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                  }}
                  placeholder="User Name"
                />
                <Label
                  for="location"
                  style={{
                    color: `${
                      validation.touched.location && validation.errors.location
                        ? "#ff6666"
                        : ""
                    }`,
                  }}
                >
                  Holiday Location
                </Label>
                {validation.touched.location && validation.errors.location ? (
                  <FormFeedback type="invalid">
                    {validation.errors.location}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup floating>
                <Input
                  type="select"
                  id="countryId"
                  bsSize="lg"
                  name="countryId"
                  className="w-100 text-start ps-3 pt-3"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.countryId || ""}
                  invalid={
                    validation.touched.countryId && validation.errors.countryId
                      ? true
                      : false
                  }
                  style={{
                    backgroundColor: "#F8F8FA",
                    border: `${
                      validation.touched.countryId &&
                      validation.errors.countryId
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                    borderRadius: "15px",
                    padding: "1px",
                  }}
                  placeholder="Branch"
                >
                  {countrys.map((ele, index) => (
                    <option value={ele.value} key={index}>
                      {ele.label}
                    </option>
                  ))}
                </Input>
                <Label for="countryId">Country</Label>
                {validation.touched.countryId && validation.errors.countryId ? (
                  <FormFeedback type="invalid">
                    {validation.errors.countryId}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup floating>
                <Input
                  type="select"
                  id="employeeShiftId"
                  bsSize="lg"
                  name="employeeShiftId"
                  className="w-100 text-start ps-3 pt-3"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.employeeShiftId || ""}
                  invalid={
                    validation.touched.employeeShiftId &&
                    validation.errors.employeeShiftId
                      ? true
                      : false
                  }
                  style={{
                    backgroundColor: "#F8F8FA",
                    border: `${
                      validation.touched.employeeShiftId &&
                      validation.errors.employeeShiftId
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                    borderRadius: "15px",
                    padding: "1px",
                  }}
                  placeholder="Shift"
                >
                  {[...shiftList].map((ele, index) => (
                    <option value={ele.value} key={index}>
                      {ele.label}
                    </option>
                  ))}
                </Input>
                <Label for="employeeShiftId">Shift</Label>
                {validation.touched.employeeShiftId &&
                validation.errors.employeeShiftId ? (
                  <FormFeedback type="invalid">
                    {validation.errors.employeeShiftId}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup floating>
                <Input
                  type="textarea"
                  id="details"
                  name="details"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.details || ""}
                  invalid={
                    validation.touched.details && validation.errors.details
                      ? true
                      : false
                  }
                  style={{
                    border: `${
                      validation.touched.details && validation.errors.details
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                  }}
                  placeholder="User Name"
                />
                <Label
                  for="details"
                  style={{
                    color: `${
                      validation.touched.details && validation.errors.details
                        ? "#ff6666"
                        : ""
                    }`,
                  }}
                >
                  Holiday Detail
                </Label>
                {validation.touched.details && validation.errors.details ? (
                  <FormFeedback type="invalid">
                    {validation.errors.details}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="text-center mt-3">
                <button type="submit" className="btn btn-success btn-lg ms-2">
                  {id ? "Update Holiday" : "Add Holiday"}
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-lg ms-2"
                  onClick={handelCloseClick}
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

HolidayModel.propTypes = {
  onCloseClick: PropTypes.func,
  show: PropTypes.any,
}

export default HolidayModel
