import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { useState } from "react"
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap"

// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"

// action
import { registerUser, apiError } from "../../store/actions"

// Redux
import { useSelector, useDispatch } from "react-redux"

import { Link } from "react-router-dom"

// import images
import logo from "../../assets/images/logo 123.png"
import logolight from "../../assets/images/logo-light.png"
import google_i from "../../assets/images/super-g.svg"
// import mockup from "../../assets/images/mockup.png"
import registerMockup from "../../assets/images/register-mockup.png"
import email from "../../assets/images/email.svg"
import lock from "../../assets/images/Lock.svg"
import pw from "../../assets/images/pw.svg"
import name from "../../assets/images/name.svg"

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

const Register = props => {
  const [passwordInputType, setPasswordInputType] = useState(true)

  const dispatch = useDispatch()

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "eve.holt@reqres.in",
      username: "",
      password: "pistol",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please enter a valid email address"),
      username: Yup.string().required("Please Enter Your Username"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: values => {
      delete values.username
      dispatch(registerUser(values, props.history))
    },
  })

  const { user, registrationError } = useSelector(state => ({
    user: state.Account.user,
    registrationError: state.Account.registrationError,
    loading: state.Account.loading,
  }))

  // handleValidSubmit
  // const handleValidSubmit = (event, values) => {
  //   dispatch(registerUser(values));
  // }

  useEffect(() => {
    dispatch(apiError(""))
    document.body.className = "authentication-bg"
    // remove classname when component will unmount
    return function cleanup() {
      document.body.className = ""
    }
  }, [dispatch])

  return (
    <React.Fragment>
      <div className="account-pages register" style={{ overflowX: "hidden" }}>
        <Container fluid>
          <Row>
            <Col lg={6} className="left-panel">
              <img src={logo} alt="" width="40%" />
              <div className="slide-content">
                {/* <Slider {...settings}>
                  <div>
                    <img src={registerMockup} alt="" />
                    <div className='inner-content'>
                      <h3 className='text-white'>Easy to use Dashboard</h3>
                      <p className='text-white'>Choose the best of product/services and get a bare <br /> metal server at the lowest prices.</p>
                    </div>
                  </div>
                  <div>
                    <img src={registerMockup} alt="" />
                    <div className='inner-content'>
                      <h3 className='text-white'>Easy to use Dashboard</h3>
                      <p className='text-white'>Choose the best of product/services and get a bare <br /> metal server at the lowest prices.</p>
                    </div>
                  </div>
                  <div>
                    <img src={registerMockup} alt="" />
                    <div className='inner-content'>
                      <h3 className='text-white'>Easy to use Dashboard</h3>
                      <p className='text-white'>Choose the best of product/services and get a bare <br /> metal server at the lowest prices.</p>
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
                <div className="text-center mt-2 mb-2">
                  <h5 className="m-0 text-center">Create your account</h5>
                  {/* <button className='g-btn'>
                    <img src={google_i} alt="" /> Sign Up with Google
                  </button> */}
                  {/* <div className='sub_header register'>
                    <p className="text-muted m-0"><span>OR</span></p>
                  </div> */}
                </div>
                <div className="ragister">
                  <Form
                    className="form-horizontal"
                    onSubmit={e => {
                      e.preventDefault()
                      validation.handleSubmit()
                      return false
                    }}
                  >
                    {user && user ? (
                      <Alert color="success">Register User Successfully</Alert>
                    ) : null}

                    {registrationError && registrationError ? (
                      <Alert color="danger">{registrationError}</Alert>
                    ) : null}
                    <div className="mb-3 form-g position-relative">
                      <Input
                        name="username"
                        type="text"
                        placeholder="Your Name"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.username || ""}
                        invalid={
                          validation.touched.username &&
                          validation.errors.username
                            ? true
                            : false
                        }
                      />
                      {validation.touched.username &&
                      validation.errors.username ? (
                        <FormFeedback type="invalid">
                          {validation.errors.username}
                        </FormFeedback>
                      ) : null}
                      <img className="form-icon" src={name} alt="" />
                    </div>
                    <div className="mb-3 form-g position-relative">
                      <Input
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Your Email"
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

                    <div className="mb-3 form-g position-relative">
                      <Input
                        name="password"
                        value={validation.values.password || ""}
                        type={passwordInputType ? "password" : "text"}
                        placeholder="Password"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        invalid={
                          validation.touched.password &&
                          validation.errors.password
                            ? true
                            : false
                        }
                      />
                      <div
                        onClick={() => setPasswordInputType(!passwordInputType)}
                      >
                        <img className="pw-icon" src={pw} alt="" />
                      </div>
                      <p className="font-normal text-muted mt-1 font-semi">
                        Must be 8 characters at least
                      </p>
                      {validation.touched.password &&
                      validation.errors.password ? (
                        <FormFeedback type="invalid">
                          {validation.errors.password}
                        </FormFeedback>
                      ) : null}

                      <img className="form-icon" src={lock} alt="" />
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="auth-terms-condition-check"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="auth-terms-condition-check"
                      >
                        I agree to the
                        <Link to="#" className="text-primary">
                          {" "}
                          Terms & Conditions
                        </Link>
                      </label>
                    </div>

                    <div className="mt-3 text-end">
                      <button
                        className="btn btn-primary w-100 waves-effect waves-light"
                        type="submit"
                      >
                        Register
                      </button>
                    </div>

                    <div className="mt-4 text-center">
                      <p className="text-muted mb-0 font-normal">
                        Already have an account ?{" "}
                        <Link to="/login" className="fw-medium text-primary">
                          {" "}
                          Sign In
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
export default Register

Register.propTypes = {
  registerUser: PropTypes.func,
  // registerUserFailed: PropTypes.func,
  registrationError: PropTypes.any,
  user: PropTypes.any,
}
