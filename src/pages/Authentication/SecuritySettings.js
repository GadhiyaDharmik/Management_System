import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
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
  Modal,
  Form,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

//redux
import { useSelector, useDispatch } from "react-redux";

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";

import avatar from "../../assets/images/users/avatar-4.jpg";
// actions
import { editProfile, resetProfileFlag } from "../../store/actions";
import { Link } from "react-router-dom";

import FloatingLabel from "react-bootstrap-floating-label";


import time from "../../assets/images/time.svg"
import paypal from "../../assets/images/paypal.svg"
import razor from "../../assets/images/razor.svg"
import stripe from "../../assets/images/stripe.svg"
import usd from "../../assets/images/usd.svg"
import wise from "../../assets/images/wise.svg"
import google_i from "../../assets/images/super-g.svg"
import close from "../../assets/images/close-fill.svg"
import qr from "../../assets/images/qr.svg"
import insurance from "../../assets/images/insurance.svg"


const SecuritySettings = props => {
  const dispatch = useDispatch();

  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [idx, setidx] = useState("");

  const { error, success } = useSelector(state => ({
    error: state.Profile.error,
    success: state.Profile.success,
  }));

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"));
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        setname(obj.displayName);
        setemail(obj.email);
        setidx(obj.uid);
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {

        if (obj.username) {
          setname(obj.username);
          setidx(obj.uid);
        } else {
          setname(obj.name);
        }

        setemail(obj.email);

      }
      setTimeout(() => {
        dispatch(resetProfileFlag());
      }, 3000);
    }
  }, [dispatch, success]);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: name || '',
      idx: idx || '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your UserName"),
    }),
    onSubmit: (values) => {
      dispatch(editProfile(values));
    }
  });

  const [modal_center, setmodal_center] = useState(false)
  const [modal_verified, setmodal_verified] = useState(false)


  function removeBodyCss() {
    document.body.classList.add("no_padding")
  }

  function tog_center() {
    setmodal_center(!modal_center)
    removeBodyCss()
  }

  function tog_verified() {
    setmodal_verified(!modal_verified)
    removeBodyCss()
  }

  // OTP input
  const [code, setCode] = useState("");

  const handleChange = (code) => setCode(code);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Minible" breadcrumbItem="Security Settings" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <div className="security_content">
                    <div className="header mb-20">
                      <h6 className="font-16 font-semibold">Linked Accounts</h6>
                      <p className="font-small">We only use this information to verify your account and will never post on your behalf.</p>
                    </div>
                    <div className="other-content">
                      <p className="font-small">Connect your account with Google to simplify your Sign-in experience.</p>
                      <button className='g-btn mb-0'>
                        <img src={google_i} alt="" /> Connect with Google
                      </button>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <div className="security_content">
                    <div className="header mb-20">
                      <h6 className="font-16 font-semibold">Two- Factor Authentication</h6>
                      <p className="font-small">We recommend enabling Two-Factor authentication to provide an extra layer of security to your account.</p>
                    </div>
                    <div className="other-content">
                      <p className="font-small">Two-Factor Authentication is currently <span className="font-semibold">Disabled</span>.</p>
                      <button
                        type="button"
                        className="btn btn-danger waves-effect waves-light btn-green"
                        onClick={() => {
                          tog_center()
                        }}
                        data-toggle="modal"
                        data-target=".bs-example-modal-center"
                      >
                        Click here to Enable
                      </button>
                      <Modal
                        isOpen={modal_center}
                        toggle={() => {
                          tog_center()
                        }}
                        centered={true}
                      >
                        <div className="modal-header">
                          <Row className="w-100">
                            <Col xs="11">

                              <h5 className="modal-title mt-0">Two-Factor Authentication</h5>
                            </Col>
                            <Col xs="1">
                              <button
                                type="button"
                                onClick={() => {
                                  setmodal_center(false)
                                }}
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true"> <img src={close} alt="" /></span>
                              </button>
                            </Col>
                          </Row>

                        </div>
                        <div className="modal-body p-0 two-factor">
                          <div className="inner-content">
                            <h6 className="text-black-v1 font-16  font-semibold">
                              Set up two-factor authentication
                            </h6>
                            <p className="text-black-v2 font-small font-normal center-content">Scan this QR code with your Google Authenticator App or Google Duo and enter the verification code below.</p>
                          </div>
                          <p className="text-black-v2 font-small font-normal">Having trouble scanning the code? sEnter the code manually: <span className="text-blue font-semibold">DK3ED2VLFCVSSG3F</span></p>
                          <div className="qr-code text-center">
                            <img src={qr} alt="" />
                          </div>
                          <div className="form-content">
                            <p className="font-16 text-blue font-semibold">Verification Code</p>
                            <Form
                              className="form-horizontal digit-form"
                              onSubmit={(e) => {
                                e.preventDefault();
                                validation.handleSubmit();
                                // api call 
                                setmodal_center(false);
                                setmodal_verified(true);
                                return false;
                              }}
                            >
                              <div className=" form-g position-relative input-group d-flex align-items-center two-factor-form">
                                <OtpInput
                                  value={code}
                                  onChange={handleChange}
                                  numInputs={6}
                                  separator={<span style={{ width: "8px" }}></span>}
                                  isInputNum={true}
                                  shouldAutoFocus={true}
                                  inputStyle={{
                                    border: "1px solid #EFEFF2",
                                    borderRadius: "12px",
                                    width: "55px",
                                    height: "55px",
                                    fontSize: "20px",
                                    color: "#000",
                                    fontWeight: "600",
                                    caretColor: "#3F3D65",
                                  }}
                                  focusStyle={{
                                    border: "1px solid #6062F9",
                                    outline: "none",
                                    boxShadow: "0px 12px 16px #6062f90f;",
                                    borderRadius: "12px",
                                  }}></OtpInput>
                              </div>
                              <button
                                className="btn btn-primary w-100 waves-effect waves-light d-flex justify-content-center align-items-center"
                                type="submit"
                              >
                                Next
                              </button>
                            </Form>
                          </div>
                        </div>
                      </Modal>
                      <Modal
                        isOpen={modal_verified}
                        toggle={() => {
                          tog_verified()
                        }}
                        centered={true}
                      >
                        <div className="modal-header">
                          <Row className="w-100">
                            <Col xs="11">

                              <h5 className="modal-title mt-0">Two-Factor Authentication</h5>
                            </Col>
                            <Col xs="1">
                              <button
                                type="button"
                                onClick={() => {
                                  setmodal_verified(false)
                                }}
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true"> <img src={close} alt="" /></span>
                              </button>
                            </Col>
                          </Row>

                        </div>
                        <div className="modal-body p-0 two-factor verify">
                          <div className="img_block text-center">
                            <img src={insurance} alt="" />
                          </div>
                          <h6 className="font-bold text-blue text-center">Two-Factor Authentication Verified</h6>
                          <button 
                          className="btn btn-primary w-100 waves-effect waves-light d-flex justify-content-center align-items-center" 
                          type="button"
                          onClick={() => {
                            setmodal_verified(false)
                          }}
                          data-dismiss="modal"
                          aria-label="Close"
                          >Close</button>
                        </div>
                      </Modal>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default SecuritySettings;
