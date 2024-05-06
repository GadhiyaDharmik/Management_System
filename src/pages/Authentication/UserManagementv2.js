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


import time from "../../assets/images/time.svg"

const UserManagementv2 = props => {
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
          <Breadcrumb title="Minible" breadcrumbItem="User Management" />

          <Row>
            <Col lg="12">
              {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null}
              <Form
                className="form-horizontal user-management"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <Card>
                  <CardBody>
                    <div className="form-g position-relative form-bottom-border mb-20">
                      <Input
                        name="email"
                        className="form-control"
                        placeholder="Email Address"
                        type="email"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.email || ""}
                        invalid={
                          validation.touched.email && validation.errors.email ? true : false
                        }
                      />

                    </div>
                    <div className="inner-content user">
                      <h4 className="font-bold text-blue">ikperfect@hotmail.com</h4>
                      <p className="text-primary d-flex align-items-center font-semi"><img className="mr-3" src={time} /> Last Login: 1 month ago</p>

                      <div className="grp-btn d-inline-flex">
                        <button
                          className="btn btn-border waves-effect waves-light"
                          type="submit"
                        >
                          Manage Permissions
                        </button>
                        <button
                          className="btn btn-danger waves-effect waves-light mx-4 btn-remove text-white"
                          type="submit"
                        >
                          Remove Access
                        </button>
                      </div>

                    </div>
                  </CardBody>
                </Card>
                <Card className="m-0">
                  <CardBody>
                    <div className="inner-content invite-user">
                      <h6 className="font16  font-semibold">Invite New User</h6>

                      <div className="mb-3 form-g position-relative">
                        <Input
                          name="username"
                          className="form-control bg-input"
                          type="email"
                          placeholder="Evenscript@gmail.com"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                        />
                      </div>

                      <div className="radio-btn radio-server-group">
                        <div className="form-check form-check-inline">
                          <Input
                            type="radio"
                            id="customRadioInline1"
                            name="customRadioInline1"
                            className="form-check-input"
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="customRadioInline1"
                          >
                            All permissions
                          </Label>
                        </div>
                        &nbsp;
                        <div className="form-check form-check-inline">
                          <Input
                            type="radio"
                            id="customRadioInline2"
                            name="customRadioInline1"
                            className="form-check-input"
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="customRadioInline2"
                          >
                            Choose permissions
                          </Label>
                        </div>
                      </div>
                      <div className="check-group group-server">
                        <div className="form-check d-flex align-items-center">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customControlInline1"
                          />
                          <label
                            className="form-check-label d-flex align-items-center"
                            htmlFor="customControlInline1"
                          >
                            <p className="text-color-v1 text-color-v1 font-small">Modify Master Account Profile</p><b>-</b><span>Access and modify the client profile information</span>
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
                            <p className="text-color-v1 text-color-v1 font-small">View & Manage Contacts</p><b>-</b><span>Access and manage contacts</span>
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
                            <p className="text-color-v1 text-color-v1 font-small">View & Modify Product Passwords</p><b>-</b><span>View access to products, services and addons</span>
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customControlInline4"
                          />
                          <label
                            className="form-check-label d-flex align-items-center"
                            htmlFor="customControlInline4"
                          >
                            <p className="text-color-v1 text-color-v1 font-small">Perform Single Sign-On</p><b>-</b><span>Order Details, Welcome Emails, etc...</span>
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
                            <p className="text-color-v1 text-color-v1 font-small">View Domains</p><b>-</b><span>Renewal Notices, Registration Confirmations, etc...</span>
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
                            <p className="text-color-v1 text-color-v1 font-small">Manage Domain Settings</p><b>-</b><span>Renewal Notices, Registration Confirmations, etc... </span>
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customControlInline7"
                          />
                          <label
                            className="form-check-label d-flex align-items-center"
                            htmlFor="customControlInline7"
                          >
                            <p className="text-color-v1 text-color-v1 font-small">Manage Domain Settings</p><b>-</b><span>Renewal Notices, Registration Confirmations, etc... </span>
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customControlInline8"
                          />
                          <label
                            className="form-check-label d-flex align-items-center"
                            htmlFor="customControlInline8"
                          >
                            <p className="text-color-v1 text-color-v1 font-small">View & Pay Invoices</p><b>-</b><span>Renewal Notices, Registration Confirmations, etc...</span>
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customControlInline9"
                          />
                          <label
                            className="form-check-label d-flex align-items-center"
                            htmlFor="customControlInline9"
                          >
                            <p className="text-color-v1 text-color-v1 font-small">View & Accept Quotes</p><b>-</b><span>Renewal Notices, Registration Confirmations, etc...</span>
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customControlInline10"
                          />
                          <label
                            className="form-check-label d-flex align-items-center"
                            htmlFor="customControlInline10"
                          >
                            <p className="text-color-v1 text-color-v1 font-small">View & Open Support Tickets</p><b>-</b><span>Renewal Notices, Registration Confirmations, etc...</span>
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customControlInline11"
                          />
                          <label
                            className="form-check-label d-flex align-items-center"
                            htmlFor="customControlInline11"
                          >
                            <p className="text-color-v1 text-color-v1 font-small">View & Manage Affiliate Accounts</p><b>-</b><span>Renewal Notices, Registration Confirmations, etc... </span>
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customControlInline12"
                          />
                          <label
                            className="form-check-label d-flex align-items-center"
                            htmlFor="customControlInline12"
                          >
                            <p className="text-color-v1 text-color-v1 font-small">View Emails</p><b>-</b><span>Renewal Notices, Registration Confirmations, etc... </span>
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customControlInline13"
                          />
                          <label
                            className="form-check-label d-flex align-items-center"
                            htmlFor="customControlInline13"
                          >
                            <p className="text-color-v1 text-color-v1 font-small">Place New Orders/Upgrades/Cancellations</p><b>-</b><span>Renewal Notices, Registration Confirmations, etc... </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <div className="btn-group mt-30">
                  <button
                    className="btn btn-primary w-100 waves-effect waves-light btn-save font-normal btnv1"
                    type="submit"
                  >
                    Send Invite
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

export default UserManagementv2;
