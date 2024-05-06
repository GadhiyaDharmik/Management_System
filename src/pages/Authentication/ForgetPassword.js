import PropTypes from "prop-types"
import React, { useEffect } from "react"
import {
  Row,
  Col,
  Alert,
  Card,
  CardBody,
  Container,
  FormFeedback,
  Input,
  Label,
  Form,
} from "reactstrap"

// Redux
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"

// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"

// action
import { userForgetPassword } from "../../store/actions"

// import images
import logo from "../../assets/images/logo 123.png"
// import mockup from "../../assets/images/mockup.png"
import forgot from "../../assets/images/forgot.svg"
import email from "../../assets/images/email.svg"
import arrow from "../../assets/images/arrow.svg"
import mockup from "../../assets/images/Screenshot 2023-04-13 161024.png"
import mockup2 from "../../assets/images/Screenshot 2023-04-13 161750.png"
import mockup3 from "../../assets/images/Screenshot 2023-04-13 161944.png"

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
}

const ForgetPasswordPage = props => {
  const dispatch = useDispatch()

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
    }),
    onSubmit: values => {
      dispatch(userForgetPassword(values, props.history))
    },
  })

  useEffect(() => {
    document.body.className = "authentication-bg"
    // remove classname when component will unmount
    return function cleanup() {
      document.body.className = ""
    }
  })
  const { forgetError, forgetSuccessMsg } = useSelector(state => ({
    forgetError: state.ForgetPassword.forgetError,
    forgetSuccessMsg: state.ForgetPassword.forgetSuccessMsg,
  }))

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="mdi mdi-home-variant h2"></i>
        </Link>
      </div>

      <div className="account-pages forgot">
        <Container fluid>
          <Row>
            <Col lg={6} className="left-panel">
              <img src={logo} alt="" width="40%" />
              <div className="slide-content">
                {/* <Slider {...settings}>
                  <div>
                    <img src={mockup} alt="" />
                    <div className='inner-content'>
                      <h3 className='text-white'>See Server Information</h3>
                      <p className='text-white'>Pick one of our 20+ server locations packed with bare <br /> metal servers and host your applications instantly.</p>
                    </div>
                  </div>
                  <div>
                    <img src={mockup} alt="" />
                    <div className='inner-content'>
                      <h3 className='text-white'>See Server Information</h3>
                      <p className='text-white'>Pick one of our 20+ server locations packed with bare <br /> metal servers and host your applications instantly.</p>
                    </div>
                  </div>
                  <div>
                    <img src={mockup} alt="" />
                    <div className='inner-content'>
                      <h3 className='text-white'>See Server Information</h3>
                      <p className='text-white'>Pick one of our 20+ server locations packed with bare <br /> metal servers and host your applications instantly.</p>
                    </div>
                  </div>
                </Slider> */}
                <Slider {...settings}>
                  <div>
                    <img src={mockup} alt="" width="30%" />
                    <div className="inner-content">
                      <h3 className="text-white">Hr Management</h3>
                      <p className="text-white">
                        HRM updates are important for monitoring the employee
                        lifecycle at <br /> premises , where to organize &
                        simplify the responsibility with <br /> surety of data
                        is necessary for effective & productive work
                      </p>
                    </div>
                  </div>
                  <div>
                    <img src={mockup2} alt="" width="30%" />
                    <div className="inner-content">
                      <h3 className="text-white">Hr Management</h3>
                      <p className="text-white">
                        Employee leave management system automates the entire{" "}
                        <br />
                        leave request workflow making it seamless for the
                        <br />
                        employees and employers.
                      </p>
                    </div>
                  </div>
                  <div>
                    <img src={mockup3} alt="" width="30%" />
                    <div className="inner-content">
                      <h3 className="text-white">Hr Management</h3>
                      <p className="text-white">
                        Pick one of our 20+ server locations packed with bare{" "}
                        <br /> metal servers and host your applications
                        instantly.
                      </p>
                    </div>
                  </div>
                </Slider>
              </div>
            </Col>
            <Col lg={6}>
              <div className="right_content">
                <div className="text-center mt-2">
                  <img className="s-icon" src={forgot} alt="" />
                  <h5 className="m-0">Forgot Password?</h5>
                  <div className="forgot-content">
                    <p className="text-muted m-0 font-normal">
                      No worries, we’ll send you reset instructions.
                    </p>
                  </div>
                </div>
                <div className="p-2 mt-4">
                  {forgetError && forgetError ? (
                    <Alert
                      color="danger"
                      className="text-center mb-4"
                      style={{ marginTop: "13px" }}
                    >
                      {forgetError}
                    </Alert>
                  ) : null}
                  {forgetSuccessMsg ? (
                    <Alert
                      color="success"
                      className="text-center mb-4"
                      style={{ marginTop: "13px" }}
                    >
                      {forgetSuccessMsg}
                    </Alert>
                  ) : null}

                  <Form
                    className="form-horizontal"
                    onSubmit={e => {
                      e.preventDefault()
                      validation.handleSubmit()
                      return false
                    }}
                  >
                    <div className="mb-3 form-g position-relative">
                      <Input
                        name="email"
                        className="form-control"
                        placeholder="Evenscript@gmail.com"
                        type="email"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.email || ""}
                        invalid={
                          validation.touched.email && validation.errors.email
                            ? true
                            : false
                        }
                      />
                      {validation.touched.email && validation.errors.email ? (
                        <FormFeedback type="invalid">
                          {validation.errors.email}
                        </FormFeedback>
                      ) : null}
                      <img className="form-icon" src={email} alt="" />
                    </div>
                    <button
                      className="btn btn-primary w-100 waves-effect waves-light"
                      type="submit"
                    >
                      Reset Password
                    </button>
                    <div className="mt-4 text-center">
                      <p className="mb-0 font-normal">
                        <Link
                          to="/login"
                          className="fw-medium text-primary font-normal d-flex align-itemes-center justify-content-center"
                        >
                          {" "}
                          <img className="mx-2" src={arrow} alt="" /> Back to
                          Sign In{" "}
                        </Link>
                      </p>
                    </div>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

ForgetPasswordPage.propTypes = {
  forgetError: PropTypes.any,
  forgetSuccessMsg: PropTypes.any,
  history: PropTypes.object,
  userForgetPassword: PropTypes.func,
}

export default ForgetPasswordPage
