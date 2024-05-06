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
  ModalHeader,
} from "reactstrap"

// Date Range Picker
import DateRangePicker from "react-bootstrap-daterangepicker"

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-daterangepicker/daterangepicker.css"

import { Formik, useFormik } from "formik"
import * as Yup from "yup"

const FileLoginModel = ({ show, onCloseClick, data,id }) => {
  // const { register, handleSubmit, errors } = useForm()

  const [date, setDate] = React.useState("")
  const [errors, setErrors] = React.useState(false)

  const ComapnyNames = [
    { label: "HDFC Bank" },
    { label: "Kotak Mahindra Bank" },
    { label: "ICICI Bank" },
    { label: "Axis Bank" },
    { label: "Bank of Baroda" },
    { label: "State Bank of India" },
  ]
  const cityList = [
    { label: "Rajkot" },
    { label: "Ahmedabad" },
    { label: "Surat" },
    { label: "Vadodara" },
    { label: "Bhavnagar" },
    { label: "Jamnagar" },
    { label: "Gandhinagar" },
    { label: "Junagadh" },
  ]
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      fileNumber: data.length + 1,
      date: date,
      companyName: "",
      companyRefNo: "",
      customerName: "",
      description: "",
      city: "",
    },

    validationSchema: Yup.object({
      date: Yup.string("Please Enter Valid your Date").required(
        "Please Enter A Date"
      ),
      companyName: Yup.string("Please Select Valid your Company Name").required(
        "Please Select A Comapany Name"
      ),
      companyRefNo: Yup.string(
        "Please Enter Valid your Company Reference No"
      ).required("Please Enter your Company Reference No"),
      customerName: Yup.string(
        "Please Enter Valid your Customer Name"
      ).required("Please Enter your Customer Name"),
      description: Yup.string("Please Enter Company Discription").required(
        "Please Enter Your Company Discription"
      ),
      city: Yup.string("Please Select Valid your City").required(
        "Please Select A City"
      ),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values)
      resetForm()
      onCloseClick()
    },
  })

  const handleClose = () => {
    validation.resetForm()
    onCloseClick()
  }

  //set Selected Dates
  const handleDatepicker = (event, picker) => {
    picker.element.val(picker.startDate.format("MM/DD/YYYY"))
    setDate(picker.startDate.format("D MMMM YYYY"))
  }

  const handleDatepickerValidation = () => {
    if (date == "") {
      setErrors(true)
    } else {
      setErrors(false)
    }
  }
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalHeader>{id?"Update Login File"+" "+id:"Login New File"}</ModalHeader>
      <ModalBody>
        <Form
          className="form-horizontal floating-form my-account"
          onSubmit={e => {
            e.preventDefault()
            validation.handleSubmit()
            return false
          }}
        >
          <Row className="g-4">
            <Col lg={6}>
              <FormGroup floating>
                <Input
                  type="text"
                  id="fileNumber"
                  name="fileNumber"
                  className="fw-bold"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.fileNumber || ""}
                  invalid={
                    validation.touched.fileNumber &&
                    validation.errors.fileNumber
                      ? true
                      : false
                  }
                  style={{
                    border: `${
                      validation.touched.fileNumber &&
                      validation.errors.fileNumber
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                  }}
                  placeholder="File Number"
                />
                <Label
                  for="fileNumber"
                  style={{
                    color: `${
                      validation.touched.fileNumber &&
                      validation.errors.fileNumber
                        ? "#ff6666"
                        : ""
                    }`,
                  }}
                >
                  File Number
                </Label>
                {validation.touched.resone && validation.errors.resone ? (
                  <FormFeedback type="invalid">
                    {validation.errors.resone}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Col lg={6}>
              <DateRangePicker
                onApply={(event, picker) => handleDatepicker(event, picker)}
                initialSettings={{
                  autoUpdateInput: false,
                  locale: {
                    cancelLabel: "Clear",
                  },
                  singleDatePicker: true,
                }}
              >
                <input
                  name="date"
                  id="date"
                  style={{
                    border: `1px solid ${
                      validation.touched.date && validation.errors.date
                        ? "red"
                        : "transparent"
                    }`,
                  }}
                  placeholder="Date"
                  onChange={() => handleDatepickerValidation()}
                  className="form-control fw-bold w-100"
                />
              </DateRangePicker>

              {validation.touched.date && validation.errors.date ? (
                <p style={{ color: "red" }}>{validation.errors.date}</p>
              ) : null}
            </Col>
            <Col lg="6">
              <FormGroup floating>
                <Input
                  type="select"
                  id="companyName"
                  bsSize="lg"
                  name="companyName"
                  className="w-100 text-start ps-3 pt-3"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.companyName || ""}
                  invalid={
                    validation.touched.companyName &&
                    validation.errors.companyName
                      ? true
                      : false
                  }
                  style={{
                    backgroundColor: "#F8F8FA",
                    border: `${
                      validation.touched.companyName &&
                      validation.errors.companyName
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                    borderRadius: "15px",
                    padding: "1px",
                  }}
                  placeholder="Company Name"
                >
                  {ComapnyNames.map((ele, index) => (
                    <option value={ele.label} key={index}>
                      {ele.label}
                    </option>
                  ))}
                </Input>
                <Label for="companyName">Company Name</Label>
                {validation.touched.companyName &&
                validation.errors.companyName ? (
                  <FormFeedback type="invalid">
                    {validation.errors.companyName}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Col lg={6}>
              <FormGroup floating>
                <Input
                  type="number"
                  id="companyRefNo"
                  name="companyRefNo"
                  className="fw-bold"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.companyRefNo || ""}
                  invalid={
                    validation.touched.companyRefNo &&
                    validation.errors.companyRefNo
                      ? true
                      : false
                  }
                  style={{
                    border: `${
                      validation.touched.companyRefNo &&
                      validation.errors.companyRefNo
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                  }}
                  placeholder="Discription"
                />
                <Label
                  for="companyRefNo"
                  style={{
                    color: `${
                      validation.touched.companyRefNo &&
                      validation.errors.companyRefNo
                        ? "#ff6666"
                        : ""
                    }`,
                  }}
                >
                  Company Ref No
                </Label>
                {validation.touched.resone && validation.errors.resone ? (
                  <FormFeedback type="invalid">
                    {validation.errors.resone}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Col lg={6}>
              <FormGroup floating>
                <Input
                  type="text"
                  id="customerName"
                  name="customerName"
                  className="fw-bold"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.customerName || ""}
                  invalid={
                    validation.touched.customerName &&
                    validation.errors.customerName
                      ? true
                      : false
                  }
                  style={{
                    border: `${
                      validation.touched.customerName &&
                      validation.errors.customerName
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                  }}
                  placeholder="Customer Name"
                />
                <Label
                  for="customerName"
                  style={{
                    color: `${
                      validation.touched.customerName &&
                      validation.errors.customerName
                        ? "#ff6666"
                        : ""
                    }`,
                  }}
                >
                  Customer Name
                </Label>
                {validation.touched.resone && validation.errors.resone ? (
                  <FormFeedback type="invalid">
                    {validation.errors.resone}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup floating>
                <Input
                  type="select"
                  id="city"
                  bsSize="lg"
                  name="city"
                  className="w-100 text-start ps-3 pt-3"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.city || ""}
                  invalid={
                    validation.touched.city && validation.errors.city
                      ? true
                      : false
                  }
                  style={{
                    backgroundColor: "#F8F8FA",
                    border: `${
                      validation.touched.city && validation.errors.city
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                    borderRadius: "15px",
                    padding: "1px",
                  }}
                  placeholder="Company Name"
                >
                  {cityList.map((ele, index) => (
                    <option value={ele.label} key={index}>
                      {ele.label}
                    </option>
                  ))}
                </Input>
                <Label for="city">City</Label>
                {validation.touched.city && validation.errors.city ? (
                  <FormFeedback type="invalid">
                    {validation.errors.city}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Col lg={12}>
              <FormGroup floating>
                <Input
                  type="textarea"
                  id="description"
                  name="description"
                  rows={5}
                  className="form-control fw-bold"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.description || ""}
                  invalid={
                    validation.touched.description &&
                    validation.errors.description
                      ? true
                      : false
                  }
                  style={{
                    border: `${
                      validation.touched.description &&
                      validation.errors.description
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                  }}
                  placeholder="Discription"
                />
                <Label
                  for="description"
                  style={{
                    color: `${
                      validation.touched.description &&
                      validation.errors.description
                        ? "#ff6666"
                        : ""
                    }`,
                  }}
                >
                  Discription
                </Label>
                {validation.touched.description &&
                validation.errors.description ? (
                  <FormFeedback type="invalid">
                    {validation.errors.description}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="text-center mt-3">
                <button type="submit" className="btn bg-success btn-lg ms-2">
                 {id?"Update File":"Add File"} 
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

FileLoginModel.propTypes = {
  onCloseClick: PropTypes.func,
  data: PropTypes.any,
  show: PropTypes.any,
}
export default FileLoginModel 