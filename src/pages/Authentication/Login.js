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

// Redux
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

// Formik validation
import * as Yup from "yup"
import { useFormik } from "formik"

//Social Media Imports
import { GoogleLogin } from "react-google-login"
// import TwitterLogin from "react-twitter-auth"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"

// actions
import { loginUser, socialLogin } from "../../store/actions"

// import images
import logo from "../../assets/images/logo 123.png"
import logolight from "../../assets/images/logo-light.png"
import mockup from "../../assets/images/Screenshot 2023-04-13 161024.png"
import mockup2 from "../../assets/images/Screenshot 2023-04-13 161750.png"
import mockup3 from "../../assets/images/Screenshot 2023-04-13 161944.png"

import hand from "../../assets/images/hand.PNG"

import email from "../../assets/images/email.svg"
import lock from "../../assets/images/Lock.svg"
import google_i from "../../assets/images/super-g.svg"
import pw from "../../assets/images/pw.svg"

//Import config
import { facebook, google } from "../../config"

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

const Login = props => {
  let navigate = useNavigate()

  const [passwordInputType, setPasswordInputType] = useState(true)

  const dispatch = useDispatch()

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "john@doe.comx" || "",
      password: "test123" || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please enter a valid email address"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: values => {
      // dispatch(loginUser(values, props.history))
      localStorage.setItem("User", values.email, values.password)
      navigate("/dashboard")
      // navigate("/dashboard")
    },
  })

  const { error } = useSelector(state => ({
    error: state.Login.error,
  }))

  const signIn = (res, type) => {
    if (type === "google" && res) {
      const postData = {
        name: res.profileObj.name,
        email: res.profileObj.email,
        token: res.tokenObj.access_token,
        idToken: res.tokenId,
      }
      dispatch(socialLogin(postData, props.history, type))
    } else if (type === "facebook" && res) {
      const postData = {
        name: res.name,
        email: res.email,
        token: res.accessToken,
        idToken: res.tokenId,
      }
      dispatch(socialLogin(postData, props.history, type))
    }
  }

  //handleGoogleLoginResponse
  const googleResponse = response => {
    signIn(response, "google")
  }

  //handleFacebookLoginResponse
  const facebookResponse = response => {
    signIn(response, "facebook")
  }

  useEffect(() => {
    document.body.className = "authentication-bg"
    // remove classname when component will unmount
    return function cleanup() {
      document.body.className = ""
    }
  })

  return (
    <React.Fragment>
      <div className="account-pages" style={{ overflowX: "hidden" }}>
        <Container fluid>
          <Row>
            <Col lg={6} className="left-panel">
              <img src={logo} alt="" width="40%" />
              <div className="slide-content">
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
                        Attendance Management is establish for the employer to
                        check when <br /> their activities of arrival and leave
                        with in using <br /> this upgraded facilities.
                      </p>
                    </div>
                  </div>
                </Slider>
              </div>
            </Col>
            <Col lg={6}>
              <div className="right_content">
                <div className="text-center mt-2">
                  <img className="s-icon" src={hand} alt="" />
                  <h5 className="m-0">Welcome Back !</h5>
                </div>

                <div className="p-2 mt-4">
                  <Form
                    className="form-horizontal"
                    onSubmit={e => {
                      e.preventDefault()
                      validation.handleSubmit()
                      return false
                    }}
                  >
                    {error ? <Alert color="danger">{error}</Alert> : null}

                    <div className="mb-3 form-g position-relative">
                      <Input
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
                        placeholder="**********"
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
                        id="customControlInline"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="customControlInline"
                      >
                        Remember me
                      </label>
                      <div className="float-end">
                        <Link
                          to="/forgot-password"
                          className="text-muted font-normal"
                        >
                          Forgot password?
                        </Link>
                      </div>
                    </div>
                    <ul className="list-inline">
                      {google.CLIENT_ID != "" && (
                        <li className="list-inline-item">
                          <GoogleLogin
                            clientId={google.CLIENT_ID}
                            render={renderProps => (
                              <Link
                                to="#"
                                className="social-list-item bg-danger text-white border-danger"
                                onClick={renderProps.onClick}
                              >
                                <i className="mdi mdi-google" />
                              </Link>
                            )}
                            onSuccess={googleResponse}
                            onFailure={() => {}}
                          />
                        </li>
                      )}
                    </ul>
                    <div className="mt-3">
                      <button
                        className="btn btn-primary w-100 waves-effect waves-light"
                        type="submit"
                      >
                        Sign In
                      </button>
                    </div>

                    <div className="mt-4 text-center"></div>

                    <div className="mt-4 text-center form-footer ">
                      <p className="mb-0 text-muted font-normal">
                        Not registered yet?{" "}
                        <a
                          href="/register"
                          className="fw-medium text-primary font-normal"
                        >
                          {" "}
                          Create an Account{" "}
                        </a>{" "}
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

export default Login

Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func,
}
