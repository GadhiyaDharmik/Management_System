import React, { useState, useEffect } from "react";
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




const UserAccountDetail = props => {
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


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Minible" breadcrumbItem="User account details" />

          <Row>
            <Col lg="12">
              {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null}
              <Form
                className="form-horizontal floating-form my-account"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <Card>
                  <CardBody>
                    <div className="my-account-header">
                      <h6 className="font16  font-semibold">Personal / Company Details</h6>
                    </div>
                    <Row>
                      <Col lg="6">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="First Name"
                          className="mt-3"
                        >
                          <Form.Control type="text" placeholder="" />
                        </FloatingLabel>
                      </Col>
                      <Col lg="6">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Last Name"
                          className="mt-3"
                        >
                          <Form.Control type="text" placeholder="" />
                        </FloatingLabel>
                      </Col>
                      <Col lg="6">
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
                      </Col>
                    </Row>

                  </CardBody>
                </Card>
                <Card>
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

                <div className="check-group_v2">
                  <div className="my-account-header">
                    <h6 className="font16 font-semibold mb-20">Email preferences</h6>
                  </div>
                  <div className="check-group">
                    <div className="form-check d-flex align-items-center">
                      <div className="check-block">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline1"
                        />
                        <label
                          className="form-check-label d-flex align-items-center"
                          htmlFor="customControlInline1"
                        >
                          <p className="text-color-v1 text-color-v1 font-small">General Emails</p><b>-</b><span>General Announcements & Password Reminders</span>
                        </label>
                      </div>

                    </div>
                    <div className="form-check d-flex align-items-center">
                      <div className="check-block">

                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline2"
                        />
                        <label
                          className="form-check-label d-flex align-items-center"
                          htmlFor="customControlInline2"
                        >
                          <p className="text-color-v1 text-color-v1 font-small">Invoice Emails</p><b>-</b><span>Invoices & Billing Reminders</span>
                        </label>
                      </div>
                    </div>
                    <div className="form-check d-flex align-items-center">
                      <div className="check-block">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline3"
                        />
                        <label
                          className="form-check-label d-flex align-items-center"
                          htmlFor="customControlInline3"
                        >
                          <p className="text-color-v1 text-color-v1 font-small">Invoice Emails</p><b>-</b><span>Invoices & Billing Reminders</span>
                        </label>
                      </div>

                    </div>
                    <div className="form-check d-flex align-items-center">
                      <div className="check-block">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline4"
                        />
                        <label
                          className="form-check-label d-flex align-items-center"
                          htmlFor="customControlInline4"
                        >
                          <p className="text-color-v1 text-color-v1 font-small">Support Emails</p><b>-</b><span>Receive a copy of all support ticket communications created by the parent account holder</span>
                        </label> </div>
                    </div>
                    <div className="form-check d-flex align-items-center">
                      <div className="check-block"> <input
                        type="checkbox"
                        className="form-check-input"
                        id="customControlInline5"
                      />
                        <label
                          className="form-check-label d-flex align-items-center"
                          htmlFor="customControlInline5"
                        >
                          <p className="text-color-v1 text-color-v1 font-small">Product Emails</p><b>-</b><span>Order Details, Welcome Emails, etc...</span>
                        </label> </div>

                    </div>
                    <div className="form-check d-flex align-items-center">
                      <div className="check-block">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline6"
                        />
                        <label
                          className="form-check-label d-flex align-items-center"
                          htmlFor="customControlInline6"
                        >
                          <p className="text-color-v1 text-color-v1 font-small">Domain Emails</p><b>-</b><span>Renewal Notices, Registration Confirmations, etc... </span>
                        </label>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="btn-group">
                  <button
                    className="btn btn-primary w-100 waves-effect waves-light btn-cancel"
                    type="submit"
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary w-100 waves-effect waves-light btn-save"
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
  );
};

export default UserAccountDetail;
