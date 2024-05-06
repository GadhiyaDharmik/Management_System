import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Alert,
  Label,
  Input,
  FormFeedback,
  Form,
  FormGroup,
  CardHeader,
  Toast,
} from "reactstrap"

// @Component
import Select from "react-select"
// import FormCheck from 'react-bootstrap/FormCheck'

// Formik Validation
import * as Yup from "yup"
import { Formik, useFormik } from "formik"

import { Link, useNavigate } from "react-router-dom"

//redux
import { useSelector, useDispatch } from "react-redux"

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"

import avatar from "../../assets/images/small/img-7.jpg"
// actions
import { editProfile, resetProfileFlag } from "../../store/actions"
// import { Link } from "react-router-dom"

import FloatingLabel from "react-bootstrap-floating-label"
import { colors, FormControl, Radio } from "@material-ui/core"

//Actions
import { addEmployee } from "../../store/actions"
import { template } from "lodash"

//Country,States And Citys

const branches = [
  { label: "Evenscript1", value: 1 },
  { label: "Evenscript2", value: 2 },
  { label: "Evenscript3", value: 3 },
  { label: "Evenscript4", value: 4 },
]
const departments = [
  { label: "EvenscriptD1", value: 1 },
  { label: "EvenscriptD2", value: 2 },
  { label: "EvenscriptD3", value: 3 },
  { label: "EvenscriptD4", value: 4 },
]

const worktypes = [
  { label: "Home", value: "Home" },
  { label: "Office", value: "Office" },
]
const roles = [
  { label: "Admin", value: 1 },
  { label: "HR", value: 2 },
  { label: "Employee", value: 3 },
]
const userTypes = [
  {
    label: "Permenent",
    value: "Permenent",
  },
  { label: "Temprary", value: "Temprary" },
]

// Custom Style of Select Fields

const customStyles = {
  control: base => ({
    ...base,
    height: 50,
    minHeight: 50,
  }),
}
//opstions
const optionGroup = [
  {
    options: [
      { label: "Admin", value: "Admin" },
      { label: "Hr", value: "Hr" },
      { label: "Employee", value: "Employee" },
    ],
  },
]

const MyAccount = props => {
  const dispatch = useDispatch()
  // const [gender, setGender] = useState('');
  const navigate = useNavigate()
  const [profileImage, setProfileImage] = React.useState("")
  //dorpdown
  const [branch, setBranch] = React.useState("")

  //Gendar

  //For Image Tost Massage
  const [show, setShow] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const { error, success } = useSelector(state => ({
    error: state.Profile.error,
    success: state.Profile.success,
  }))
  const [userProfile, setUserProfile] = useState("")
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      //file: "",
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      mobileNumber: "",
      branchId: parseInt(branch) || "",
      departmentId: 0,
      companyName: "Evenscript",
      roleId: 0,
      gender: "male",
      workType: "Office",
      joiningDate: "",
      officeTime: "",
      userType: "Permenent",
      salary: "",
      address: "",
      countryId: 1,
      stateId: 1,
      cityId: 1,
      zipCode: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string("Enter your userName").required(
        "Please Enter A User Name"
      ),
      firstName: Yup.string("Enter your First Name").required(
        "Please Enter A  First Name"
      ),
      lastName: Yup.string("Enter your Last Name").required(
        "Please Enter A  Last Name"
      ),
      email: Yup.string("Enter your Email")
        .email("Please Enter A Valid Email")
        .required("Please Enter Your Email"),
      mobileNumber: Yup.string("Enter your Mobil Number").required(
        "Please Enter A  Mobil Number"
      ),
      password: Yup.string("Enter your Password").required(
        "Please Enter A  Password"
      ),
      // gender: Yup.string("Enter your gender").required(
      //   "Please Select A  gender"
      // ),

      branchId: Yup.string("Select your Branch").required(
        "Please Select A  Branch"
      ),
      departmentId: Yup.number("Select your Department").required(
        "Please Select A  Department"
      ),
      workType: Yup.string("Enter your Work Plase").required(
        "Please Enter A  Work Plase"
      ),
      roleId: Yup.number("Select your Role").required("Please Select A  Role"),
      joiningDate: Yup.string("Enter your Joining Date").required(
        "Please Enter A  Joining Date"
      ),
      officeTime: Yup.string("Enter your Office Time").required(
        "Please Enter A  Office Time"
      ),
      userType: Yup.string("Enter your Employee Name").required(
        "Please Enter A  Employee Name"
      ),
      salary: Yup.string("Enter your Salary").required(
        "Please Enter A  Salary"
      ),
      address: Yup.string("Enter your Address").required(
        "Please Enter A  Address"
      ),
      countryId: Yup.number("Select your Country").required(
        "Please Select A  Country"
      ),
      cityId: Yup.number("Select your City").required("Please Select A  City"),
      stateId: Yup.number("Select your State").required(
        "Please Select A  State"
      ),
      zipCode: Yup.number("Please Enter Postel Code").required(
        "Please Enter Postel Code"
      ),
    }),
    onSubmit: (values, resetForm) => {
      dispatch(addEmployee(values))
      // console.log(values)
      resetForm()
    },
  })

  const countrys = [
    { id: 1, name: "India" },
    { id: 2, name: "Canada" },
    { id: 3, name: "America" },
  ].map(ele => {
    return { label: ele.name, value: ele.id }
  })

  const states = [
    { stateId: 1, countryId: 1, name: "Gujarat" },
    { stateId: 2, countryId: 1, name: "Maharashtra" },
    { stateId: 3, countryId: 1, name: "Delhi" },
    { stateId: 4, countryId: 2, name: "Alberta" },
    { stateId: 5, countryId: 2, name: "Manitoba" },
    { stateId: 6, countryId: 2, name: "Northwest Territories" },
    { stateId: 7, countryId: 3, name: "California" },
    { stateId: 8, countryId: 3, name: "New York" },
    { stateId: 9, countryId: 3, name: "Virginia" },
  ]
    .filter(item => item.countryId == validation.values.countryId)
    .map(item => {
      return {
        label: item.name,
        value: item.stateId,
        countryId: item.countryId,
      }
    })

  const citys = [
    { id: 1, stateId: 1, name: "Rajkot" },
    { id: 2, stateId: 1, name: "Ahemdabad" },
    { id: 3, stateId: 1, name: "Surat" },
    { id: 4, stateId: 2, name: "Mumbai" },
    { id: 5, stateId: 2, name: "Pune" },
    { id: 6, stateId: 3, name: "New Delhi" },
    { id: 7, stateId: 3, name: "Delhi" },
    { id: 8, stateId: 3, name: "Ali Pur" },
    { id: 9, stateId: 4, name: "Calgary" },
    { id: 10, stateId: 4, name: "St. Albert" },
    { id: 11, stateId: 4, name: "Edmonton" },
    { id: 12, stateId: 5, name: "Winnipeg" },
    { id: 13, stateId: 5, name: "Portage la Prairie" },
    { id: 14, stateId: 5, name: "Selkirk" },
    { id: 15, stateId: 6, name: "Yellowknife" },
    { id: 16, stateId: 6, name: "Fort Smith" },
    { id: 17, stateId: 6, name: "Fort Simpson" },
    { id: 18, stateId: 7, name: "Los Angeles" },
    { id: 19, stateId: 7, name: "San Diego" },
    { id: 20, stateId: 7, name: "San Jose" },
    { id: 21, stateId: 8, name: "New York" },
    { id: 22, stateId: 8, name: "New Windsor" },
    { id: 23, stateId: 8, name: "New York Mills" },
    { id: 24, stateId: 9, name: "Virginia Beach" },
    { id: 25, stateId: 9, name: "Chesapeake" },
    { id: 26, stateId: 9, name: "Norfolk" },
  ]
    .filter(item => item.stateId == validation.values.stateId)
    .map(item => {
      return { label: item.name, value: item.id, statesId: item.stateId }
    })

  const onProfileSelect = e => {
    let image = e.target.files
    let format = IMAGEFORMATS.map(ele => ele.includes(image[0].type))
    if (format.includes(true)) {  
      validation.values.file = URL.createObjectURL(e.target.files[0])
      setProfileImage(URL.createObjectURL(e.target.files[0]))
    } else {
      return setUserProfile(
        "Image size is not minimum 5mb or Image format is none of this list (jpg,jpeg,png)."
      )
    }
  }

  // React.useEffect(() => {
  //   states.filter(ele => ele.countryId == validation.values.countryId)
  //   // citys = ["Select Your State"]
  // }, [validation.values.countryId])

  // React.useEffect(() => {
  //   citys.filter(ele => ele.statesId == validation.values.stateId)
  //   // citys = ["Select Your State"]
  // }, [validation.values.countryId])
  React.useEffect(() => {
    states.filter(ele => ele.countryId == validation.values.countryId)
  }, [validation.values.countryId])

  React.useEffect(() => {
    citys.filter(ele => ele.statesId == validation.values.stateId)
  }, [validation.values.countryId])

  const handleChangeSelectGender = e => {
    validation.values.gender = e.value

    setSelectedOption(e.value)
  }
  return (
    <React.Fragment>
      <div className="page-content my-account ">
        <Container fluid>
          {/* Render Breadcrumb  */}
          <Breadcrumb title="Minible" breadcrumbItem="User account details" />
          <Row>
            <Col lg="12">
              {/* {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null} */}
              <Form
                className="form-horizontal floating-form my-account"
                onSubmit={e => {
                  e.preventDefault()
                  validation.handleSubmit()
                  return false
                }}
              >
                <Card>
                  <CardHeader style={{ backgroundColor: "#fff" }}>
                    <div className="my-account-header mb-3">
                      <h6 className="font16 font-semibold">Personal Details</h6>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col md="4" className="text-center ps-4 pe-5">
                        <div>
                          <label htmlFor="upload-button">
                            {profileImage ? (
                              <img
                                src={profileImage}
                                alt="dummy"
                                width="100%"
                                style={{
                                  cursor: "pointer",
                                  marginTop: "auto",
                                  padding: "2px",
                                  border: "3px solid #6c6c6cd1",
                                  borderStyle: "dotted",
                                }}
                              />
                            ) : (
                              <>
                                <img
                                  src={avatar}
                                  width="100%"
                                  style={{
                                    cursor: "pointer",
                                    marginTop: "auto",
                                    border: "3px solid #6c6c6cd1",
                                    borderStyle: "dotted",
                                  }}
                                />
                              </>
                            )}
                          </label>
                        </div>
                        <Label for="file">Choose A Profile Picture</Label>

                        <input
                          type="file"
                          id="upload-button"
                          style={{ display: "none" }}
                          onChange={onProfileSelect}
                        />
                        {userProfile && userProfile ? (
                          <Alert color="danger">{userProfile}</Alert>
                        ) : null}
                      </Col>
                      <Col md="8">
                        <Row>
                          <Col lg="6">
                            <FormGroup floating>
                              <Input
                                type="text"
                                id="userName"
                                name="userName"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.userName || ""}
                                invalid={
                                  validation.touched.userName &&
                                  validation.errors.userName
                                    ? true
                                    : false
                                }
                                style={{
                                  border: `${
                                    validation.touched.userName &&
                                    validation.errors.userName
                                      ? "solid 1px #ff6666"
                                      : ""
                                  }`,
                                }}
                                placeholder="User Name"
                              />
                              <Label
                                for="userName"
                                style={{
                                  color: `${
                                    validation.touched.userName &&
                                    validation.errors.userName
                                      ? "#ff6666"
                                      : ""
                                  }`,
                                }}
                              >
                                User Name
                              </Label>
                              {validation.touched.userName &&
                              validation.errors.userName ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.userName}
                                </FormFeedback>
                              ) : null}
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup floating>
                              <Input
                                type="text"
                                id="firstName"
                                name="firstName"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.firstName || ""}
                                invalid={
                                  validation.touched.firstName &&
                                  validation.errors.firstName
                                    ? true
                                    : false
                                }
                                style={{
                                  border: `${
                                    validation.touched.firstName &&
                                    validation.errors.firstName
                                      ? "solid 1px #ff6666"
                                      : ""
                                  }`,
                                }}
                                placeholder="First Name"
                              />
                              <Label
                                for="firstName"
                                style={{
                                  color: `${
                                    validation.touched.firstName &&
                                    validation.errors.firstName
                                      ? "#ff6666"
                                      : ""
                                  }`,
                                }}
                              >
                                First Name
                              </Label>
                              {validation.touched.firstName &&
                              validation.errors.firstName ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.firstName}
                                </FormFeedback>
                              ) : null}
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup floating>
                              <Input
                                type="text"
                                id="lastName"
                                name="lastName"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.lastName || ""}
                                invalid={
                                  validation.touched.lastName &&
                                  validation.errors.lastName
                                    ? true
                                    : false
                                }
                                style={{
                                  border: `${
                                    validation.touched.lastName &&
                                    validation.errors.lastName
                                      ? "solid 1px #ff6666"
                                      : ""
                                  }`,
                                }}
                                placeholder="Last Name"
                              />
                              <Label
                                for="lastName"
                                style={{
                                  color: `${
                                    validation.touched.lastName &&
                                    validation.errors.lastName
                                      ? "#ff6666"
                                      : ""
                                  }`,
                                }}
                              >
                                Last Name
                              </Label>
                              {validation.touched.lastName &&
                              validation.errors.lastName ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.lastName}
                                </FormFeedback>
                              ) : null}
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup floating>
                              <Input
                                type="text"
                                id="email"
                                name="email"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.email || ""}
                                invalid={
                                  validation.touched.email &&
                                  validation.errors.email
                                    ? true
                                    : false
                                }
                                style={{
                                  border: `${
                                    validation.touched.email &&
                                    validation.errors.email
                                      ? "solid 1px #ff6666"
                                      : ""
                                  }`,
                                }}
                                placeholder="Email"
                              />
                              <Label
                                for="email"
                                style={{
                                  color: `${
                                    validation.touched.email &&
                                    validation.errors.email
                                      ? "#ff6666"
                                      : ""
                                  }`,
                                }}
                              >
                                Email
                              </Label>
                              {validation.touched.email &&
                              validation.errors.email ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.email}
                                </FormFeedback>
                              ) : null}
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup floating>
                              <Input
                                type="text"
                                id="mobileNumber"
                                name="mobileNumber"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.mobileNumber || ""}
                                invalid={
                                  validation.touched.mobileNumber &&
                                  validation.errors.mobileNumber
                                    ? true
                                    : false
                                }
                                style={{
                                  border: `${
                                    validation.touched.mobileNumber &&
                                    validation.errors.mobileNumber
                                      ? "solid 1px #ff6666"
                                      : ""
                                  }`,
                                }}
                                placeholder="Mobile Number"
                              />
                              <Label
                                for="mobileNumber"
                                style={{
                                  color: `${
                                    validation.touched.mobileNumber &&
                                    validation.errors.mobileNumber
                                      ? "#ff6666"
                                      : ""
                                  }`,
                                }}
                              >
                                Mobile Number
                              </Label>
                              {validation.touched.mobileNumber &&
                              validation.errors.mobileNumber ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.mobileNumber}
                                </FormFeedback>
                              ) : null}
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup floating>
                              <Input
                                type="text"
                                id="password"
                                name="password"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.password || ""}
                                invalid={
                                  validation.touched.password &&
                                  validation.errors.password
                                    ? true
                                    : false
                                }
                                style={{
                                  border: `${
                                    validation.touched.password &&
                                    validation.errors.password
                                      ? "solid 1px #ff6666"
                                      : ""
                                  }`,
                                }}
                                placeholder="Password"
                              />
                              <Label
                                for="password"
                                style={{
                                  color: `${
                                    validation.touched.password &&
                                    validation.errors.password
                                      ? "#ff6666"
                                      : ""
                                  }`,
                                }}
                              >
                                Password
                              </Label>
                              {validation.touched.password &&
                              validation.errors.password ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.password}
                                </FormFeedback>
                              ) : null}
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader style={{ backgroundColor: "#fff" }}>
                    <div className="my-account-header mb-3">
                      <h6 className="font16 font-semibold">Company Details</h6>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col lg="4">
                        <FormGroup floating>
                          <Input
                            type="select"
                            id="branchId"
                            bsSize="lg"
                            name="branchId"
                            className="w-100 text-start ps-3 pt-3"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.branchId || ""}
                            invalid={
                              validation.touched.branchId &&
                              validation.errors.branchId
                                ? true
                                : false
                            }
                            style={{
                              backgroundColor: "#F8F8FA",
                              border: `${
                                validation.touched.branchId &&
                                validation.errors.branchId
                                  ? "solid 1px #ff6666"
                                  : ""
                              }`,
                              borderRadius: "15px",
                              padding: "1px",
                            }}
                            placeholder="Branch"
                          >
                            {branches.map((ele, index) => (
                              <option value={ele.value} key={index}>
                                {ele.label}
                              </option>
                            ))}
                          </Input>
                          <Label for="Department">Branch</Label>
                          {validation.touched.branchId &&
                          validation.errors.branchId ? (
                            <FormFeedback type="invalid">
                              {validation.errors.branchId}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup floating>
                          <Input
                            type="select"
                            id="departmentId"
                            bsSize="lg"
                            name="departmentId"
                            className="w-100 text-start ps-3 pt-3"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.departmentId || ""}
                            invalid={
                              validation.touched.departmentId &&
                              validation.errors.departmentId
                                ? true
                                : false
                            }
                            style={{
                              backgroundColor: "#F8F8FA",
                              border: `${
                                validation.touched.departmentId &&
                                validation.errors.departmentId
                                  ? "solid 1px #ff6666"
                                  : ""
                              }`,
                              borderRadius: "15px",
                              padding: "1px",
                            }}
                            placeholder="Department"
                          >
                            {departments.map((ele, index) => (
                              <option value={ele.value} key={index}>
                                {ele.label}
                              </option>
                            ))}
                          </Input>
                          <Label for="Department">Department</Label>
                          {validation.touched.departmentId &&
                          validation.errors.departmentId ? (
                            <FormFeedback type="invalid">
                              {validation.errors.departmentId}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup floating>
                          <Input
                            type="select"
                            id="roleId"
                            bsSize="lg"
                            name="roleId"
                            className="w-100 text-start ps-3 pt-3"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.roleId || ""}
                            invalid={
                              validation.touched.roleId &&
                              validation.errors.roleId
                                ? true
                                : false
                            }
                            style={{
                              backgroundColor: "#F8F8FA",
                              border: `${
                                validation.touched.roleId &&
                                validation.errors.roleId
                                  ? "solid 1px #ff6666"
                                  : ""
                              }`,
                              borderRadius: "15px",
                              padding: "1px",
                            }}
                            placeholder="Roles"
                          >
                            {roles.map((ele, index) => (
                              <option value={ele.value} key={index}>
                                {ele.label}
                              </option>
                            ))}
                          </Input>
                          <Label for="Roles">Roles</Label>
                          {validation.touched.roleId &&
                          validation.errors.roleId ? (
                            <FormFeedback type="invalid">
                              {validation.errors.roleId}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup floating>
                          <Input
                            type="select"
                            id="workType"
                            bsSize="lg"
                            name="workType"
                            className="w-100 text-start ps-3 pt-3"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.workType || ""}
                            invalid={
                              validation.touched.workType &&
                              validation.errors.workType
                                ? true
                                : false
                            }
                            style={{
                              backgroundColor: "#F8F8FA",
                              border: `${
                                validation.touched.workType &&
                                validation.errors.workType
                                  ? "solid 1px #ff6666"
                                  : ""
                              }`,
                              borderRadius: "15px",
                              padding: "1px",
                            }}
                            placeholder="Work From"
                          >
                            <option value=""></option>
                            {worktypes.map((ele, index) => (
                              <option value={ele.value} key={index}>
                                {ele.label}
                              </option>
                            ))}
                          </Input>
                          <Label for="workType">Work From</Label>
                          {validation.touched.workType &&
                          validation.errors.workType ? (
                            <FormFeedback type="invalid">
                              {validation.errors.workType}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup floating>
                          <Input
                            type="select"
                            id="userType"
                            bsSize="lg"
                            name="userType"
                            className="w-100 text-start ps-3 pt-3"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.userType || ""}
                            invalid={
                              validation.touched.userType &&
                              validation.errors.userType
                                ? true
                                : false
                            }
                            style={{
                              backgroundColor: "#F8F8FA",
                              border: `${
                                validation.touched.userType &&
                                validation.errors.userType
                                  ? "solid 1px #ff6666"
                                  : ""
                              }`,
                              borderRadius: "15px",
                              padding: "1px",
                            }}
                            placeholder="Employee Type"
                          >
                            {userTypes.map((ele, index) => (
                              <option value={ele.value} key={index}>
                                {ele.label}
                              </option>
                            ))}
                          </Input>
                          <Label for="userType">Employee Type</Label>
                          {validation.touched.userType &&
                          validation.errors.userType ? (
                            <FormFeedback type="invalid">
                              {validation.errors.userType}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup floating>
                          <Input
                            type="number"
                            id="salary"
                            name="salary"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.salary || ""}
                            invalid={
                              validation.touched.salary &&
                              validation.errors.salary
                                ? true
                                : false
                            }
                            style={{
                              border: `${
                                validation.touched.salary &&
                                validation.errors.salary
                                  ? "solid 1px #ff6666"
                                  : ""
                              }`,
                            }}
                            placeholder="User Name"
                          />
                          <Label
                            for="salary"
                            style={{
                              color: `${
                                validation.touched.salary &&
                                validation.errors.salary
                                  ? "#ff6666"
                                  : ""
                              }`,
                            }}
                          >
                            Salary
                          </Label>
                          {validation.touched.salary &&
                          validation.errors.salary ? (
                            <FormFeedback type="invalid">
                              {validation.errors.salary}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup floating>
                          <Input
                            type="date"
                            id="joiningDate"
                            name="joiningDate"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.joiningDate || ""}
                            invalid={
                              validation.touched.joiningDate &&
                              validation.errors.joiningDate
                                ? true
                                : false
                            }
                            style={{
                              border: `${
                                validation.touched.joiningDate &&
                                validation.errors.joiningDate
                                  ? "solid 1px #ff6666"
                                  : ""
                              }`,
                            }}
                            placeholder="User Name"
                          />
                          <Label
                            for="joiningDate"
                            style={{
                              color: `${
                                validation.touched.joiningDate &&
                                validation.errors.joiningDate
                                  ? "#ff6666"
                                  : ""
                              }`,
                            }}
                          >
                            Joining Date
                          </Label>
                          {validation.touched.joiningDate &&
                          validation.errors.joiningDate ? (
                            <FormFeedback type="invalid">
                              {validation.errors.joiningDate}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup floating>
                          <Input
                            type="time"
                            id="officeTime"
                            name="officeTime"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.officeTime || ""}
                            invalid={
                              validation.touched.officeTime &&
                              validation.errors.officeTime
                                ? true
                                : false
                            }
                            style={{
                              border: `${
                                validation.touched.officeTime &&
                                validation.errors.officeTime
                                  ? "solid 1px #ff6666"
                                  : ""
                              }`,
                            }}
                            placeholder="Office Time"
                          />
                          <Label
                            for="officeTime"
                            style={{
                              color: `${
                                validation.touched.officeTime &&
                                validation.errors.officeTime
                                  ? "#ff6666"
                                  : ""
                              }`,
                            }}
                          >
                            Office Time
                          </Label>
                          {validation.touched.officeTime &&
                          validation.errors.officeTime ? (
                            <FormFeedback type="invalid">
                              {validation.errors.officeTime}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader style={{ backgroundColor: "#fff" }}>
                    <div className="my-account-header mb-3">
                      <h6 className="font16 font-semibold">Address Details</h6>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col lg="4">
                        <FormGroup floating>
                          <Input
                            type="textarea"
                            id="address"
                            name="address"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.address || ""}
                            invalid={
                              validation.touched.address &&
                              validation.errors.address
                                ? true
                                : false
                            }
                            style={{
                              backgroundColor: "#F8F8FA",
                              border: `${
                                validation.touched.address &&
                                validation.errors.address
                                  ? "solid 1px #ff6666"
                                  : ""
                              }`,
                              borderRadius: "15px",
                            }}
                            placeholder="User Name"
                          />
                          <Label
                            for="address"
                            style={{
                              color: `${
                                validation.touched.address &&
                                validation.errors.address
                                  ? "#ff6666"
                                  : ""
                              }`,
                            }}
                          >
                            Address
                          </Label>
                          {validation.touched.address &&
                          validation.errors.address ? (
                            <FormFeedback type="invalid">
                              {validation.errors.address}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col lg="4">
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
                              validation.touched.countryId &&
                              validation.errors.countryId
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
                          {validation.touched.countryId &&
                          validation.errors.countryId ? (
                            <FormFeedback type="invalid">
                              {validation.errors.countryId}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup floating>
                          <Input
                            type="select"
                            id="stateId"
                            bsSize="lg"
                            name="stateId"
                            className="w-100 text-start ps-3 pt-3"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.stateId || ""}
                            invalid={
                              validation.touched.stateId &&
                              validation.errors.stateId
                                ? true
                                : false
                            }
                            style={{
                              backgroundColor: "#F8F8FA",
                              border: `${
                                validation.touched.stateId &&
                                validation.errors.stateId
                                  ? "solid 1px #ff6666"
                                  : ""
                              }`,
                              borderRadius: "15px",
                              padding: "1px",
                            }}
                            placeholder="Department"
                          >
                            {states.map((ele, index) => (
                              <option value={ele.value} key={index}>
                                {ele.label}
                              </option>
                            ))}
                          </Input>
                          <Label for="stateId">State</Label>
                          {validation.touched.stateId &&
                          validation.errors.stateId ? (
                            <FormFeedback type="invalid">
                              {validation.errors.stateId}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup floating>
                          <Input
                            type="select"
                            id="cityId"
                            bsSize="lg"
                            name="cityId"
                            className="w-100 text-start ps-3 pt-3"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.cityId || ""}
                            invalid={
                              validation.touched.cityId &&
                              validation.errors.cityId
                                ? true
                                : false
                            }
                            style={{
                              backgroundColor: "#F8F8FA",
                              border: `${
                                validation.touched.cityId &&
                                validation.errors.cityId
                                  ? "solid 1px #ff6666"
                                  : ""
                              }`,
                              borderRadius: "15px",
                              padding: "1px",
                            }}
                            placeholder="Citys"
                          >
                            {citys.map((ele, index) => (
                              <option value={ele.value} key={index}>
                                {ele.label}
                              </option>
                            ))}
                          </Input>
                          <Label for="cityId">City</Label>
                          {validation.touched.cityId &&
                          validation.errors.cityId ? (
                            <FormFeedback type="invalid">
                              {validation.errors.cityId}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup floating>
                          <Input
                            type="number"
                            id="zipCode"
                            bsSize="lg"
                            name="zipCode"
                            className="w-100 text-start ps-3 pt-3"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.zipCode || ""}
                            invalid={
                              validation.touched.zipCode &&
                              validation.errors.zipCode
                                ? true
                                : false
                            }
                            style={{
                              backgroundColor: "#F8F8FA",
                              border: `${
                                validation.touched.zipCode &&
                                validation.errors.zipCode
                                  ? "solid 1px #ff6666"
                                  : ""
                              }`,
                              borderRadius: "15px",
                              padding: "1px",
                            }}
                            placeholder="Zipcode"
                          />
                          <Label for="zipCode">ZipCode</Label>
                          {validation.touched.zipCode &&
                          validation.errors.zipCode ? (
                            <FormFeedback type="invalid">
                              {validation.errors.zipCode}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

                <div className="btn-group mt-30">
                  <button
                    className="btn btn-primary w-100 waves-effect waves-light btn-cancel m-0"
                    type="button"
                    onClick={() => navigate("/dashboard")}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary w-100 waves-effect waves-light btn-save m-0"
                    type="submit"
                  >
                    SUBMIT
                  </button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
const IMAGEFORMATS = ["image/jpg", "image/jpeg", "image/png"]

export default MyAccount
