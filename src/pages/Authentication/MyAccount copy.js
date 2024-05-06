import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
  FormGroup,
} from "reactstrap"

// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"

//redux
import { useSelector, useDispatch } from "react-redux"

import { withRouter } from "react-router-dom"

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"

import avatar from "../../assets/images/users/avatar-4.jpg"
// actions
import { editProfile, resetProfileFlag } from "../../store/actions"
// import { Link } from "react-router-dom"

import FloatingLabel from "react-bootstrap-floating-label"

const MyAccount = props => {
  const dispatch = useDispatch()

  const [email, setemail] = useState("")
  const [name, setname] = useState("")
  const [idx, setidx] = useState("")

  const { error, success } = useSelector(state => ({
    error: state.Profile.error,
    success: state.Profile.success,
  }))

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"))
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        setname(obj.displayName)
        setemail(obj.email)
        setidx(obj.uid)
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        if (obj.firstName) {
          setname(obj.firstName)
          setidx(obj.uid)
        } else {
          setname(obj.name)
        }

        setemail(obj.email)
      }
      setTimeout(() => {
        dispatch(resetProfileFlag())
      }, 3000)
    }
  }, [dispatch, success])

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      firstName: "",
      lastName: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string("Enter your First Name").required(
        "You Must Enter A  First Name"
      ),
      lastName: Yup.string("Enter your Last Name").required(
        "You Must Enter A  Last Name"
      ),
    }),
    onSubmit: (values, resetForm) => {
      console.log(values)
      resetForm()
    },
  })

  return (
    <React.Fragment>
      <div className="page-content my-account ">
        <Container fluid>
          {/* Render Breadcrumb  */}
          <Breadcrumb title="Minible" breadcrumbItem="User account details" />
          <Row>
            <Col lg="12">
              {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null}
              <Form
                className="form-horizontal floating-form my-account"
                onSubmit={e => {
                  e.preventDefault()
                  validation.handleSubmit()
                  return false
                }}
              >
                <Card>
                  <CardBody>
                    <div className="my-account-header mb-3">
                      <h6 className="font16 font-semibold">Personal Details</h6>
                    </div>
                    <Row>
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
                                validation.errors.firstName?"solid 1px red":""
                              }`,
                            }}
                            placeholder="First Name"
                          />
                          <Label
                            for="firstName"
                            style={{
                              color: `${
                                validation.touched.firstName &&
                                validation.errors.firstName?"red":""
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
                            className="form-control input-primary"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.lastName || ""}
                            invalid={
                              validation.touched.lastName &&
                              validation.errors.lastName
                                ? true
                                : false
                            }
                            placeholder="Last Name"
                          />
                          <Label for="lastName">Last Name</Label>
                          {validation.touched.lastName &&
                          validation.errors.lastName ? (
                            <FormFeedback type="invalid">
                              {validation.errors.lastName}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                      {/* <Col lg="6">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Email Address"
                          className="mt-3"
                        >
                          <Form.Control type="email" placeholder="" />
                        </FloatingLabel>
                      </Col>
                      <Col lg="6">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Company Name "
                          className="mt-3"
                        >
                          <Form.Control type="text" placeholder="" />
                        </FloatingLabel>
                      </Col>
                      <Col lg="6">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Phone Number "
                          className="mt-3"
                        >
                          <Form.Control type="number" placeholder="" />
                        </FloatingLabel>
                      </Col>
                      <Col lg="6">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="TAX ID "
                          className="mt-3 text-uppercase"
                        >
                          <Form.Control type="text" placeholder="" />
                        </FloatingLabel>
                      </Col> */}
                    </Row>
                  </CardBody>
                </Card>
                {/* <Card>
                  <CardBody>
                    <div className="my-account-header">
                      <h6 className="font16  font-semibold">Billing Address</h6>
                    </div>
                    <Row>
                      <Col lg="12">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Address 1"
                          className="mt-3"
                        >
                          <Form.Control type="text" placeholder="" />
                        </FloatingLabel>
                      </Col>
                      <Col lg="12">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Address 2"
                          className="mt-3"
                        >
                          <Form.Control type="text" placeholder="" />
                        </FloatingLabel>
                      </Col>
                      <Col lg="6">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="City"
                          className="mt-3"
                        >
                          <Form.Control type="text" placeholder="" />
                        </FloatingLabel>
                      </Col>
                      <Col lg="6">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="State/Region "
                          className="mt-3"
                        >
                          <Form.Control type="text" placeholder="" />
                        </FloatingLabel>
                      </Col>
                      <Col lg="6">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Country"
                          className="mt-3 text-uppercase"
                        >
                          <Form.Control type="text" placeholder="" />
                        </FloatingLabel>
                      </Col>
                      <Col lg="6">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Zip Code"
                          className="mt-3 text-uppercase"
                        >
                          <Form.Control type="text" placeholder="" />
                        </FloatingLabel>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card className="m-0">
                  <CardBody>
                    <div className="my-account-header">
                      <h6 className="font16 font-semibold mb-20">
                        Email preferences
                      </h6>
                    </div>
                    <div className="check-group">
                      <div className="form-check d-flex align-items-center">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline"
                        />
                        <label
                          className="form-check-label d-flex align-items-center"
                          htmlFor="customControlInline"
                        >
                          <p className="text-color-v1 text-color-v1 font-small">
                            General Emails
                          </p>
                          <b>-</b>
                          <span>
                            General Announcements & Password Reminders
                          </span>
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline"
                        />
                        <label
                          className="form-check-label d-flex align-items-center"
                          htmlFor="customControlInline"
                        >
                          <p className="text-color-v1 text-color-v1 font-small">
                            Invoice Emails
                          </p>
                          <b>-</b>
                          <span>Invoices & Billing Reminders</span>
                        </label>
                      </div>

                      <div className="form-check d-flex align-items-center">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline2"
                        />
                        <label
                          className="form-check-label d-flex align-items-center"
                          htmlFor="customControlInline2"
                        >
                          <p className="text-color-v1 text-color-v1 font-small">
                            Invoice Emails
                          </p>
                          <b>-</b>
                          <span>Invoices & Billing Reminders</span>
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline3"
                        />
                        <label
                          className="form-check-label d-flex align-items-center"
                          htmlFor="customControlInline3"
                        >
                          <p className="text-color-v1 text-color-v1 font-small">
                            Support Emails
                          </p>
                          <b>-</b>
                          <span>
                            Receive a copy of all support ticket communications
                            created by the parent account holder
                          </span>
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline5"
                        />
                        <label
                          className="form-check-label d-flex align-items-center"
                          htmlFor="customControlInline5"
                        >
                          <p className="text-color-v1 text-color-v1 font-small">
                            Product Emails
                          </p>
                          <b>-</b>
                          <span>Order Details, Welcome Emails, etc...</span>
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-center">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline6"
                        />
                        <label
                          className="form-check-label d-flex align-items-center"
                          htmlFor="customControlInline6"
                        >
                          <p className="text-color-v1 text-color-v1 font-small">
                            Domain Emails
                          </p>
                          <b>-</b>
                          <span>
                            Renewal Notices, Registration Confirmations, etc...{" "}
                          </span>
                        </label>
                      </div>
                    </div>
                  </CardBody>
                </Card> */}

                <div className="btn-group mt-30">
                  <button
                    className="btn btn-primary w-100 waves-effect waves-light btn-cancel m-0"
                    type="submit"
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary w-100 waves-effect waves-light btn-save m-0"
                    type="submit"
                  >
                    Save Changes
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

export default withRouter(MyAccount)
