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

const ChangePassword = props => {
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
      <div className="page-content change-pw">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Minible" breadcrumbItem="Change Password" />

          <Row>
            <Col lg="12">
              {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null}
              <Form
                className="form-horizontal profile-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <Card className="m-0">
                  <CardBody>
                    <div className="form-group">
                      <Label className="form-label">Existing Password</Label>
                      <Input
                        name="password"
                        value={validation.values.password || ""}
                        type="password"
                        placeholder="**********"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        invalid={
                          validation.touched.password && validation.errors.password ? true : false
                        }
                      />
                      {validation.touched.password && validation.errors.password ? (
                        <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <Label className="form-label">New Password</Label>
                      <Input
                        name="password"
                        value={validation.values.password || ""}
                        type="password"
                        placeholder="**********"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        invalid={
                          validation.touched.password && validation.errors.password ? true : false
                        }

                      />
                      <p className="font-normal text-muted mt-2 font-semi">Must be 8 characters at least</p>
                      {validation.touched.password && validation.errors.password ? (
                        <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <Label className="form-label">Confirm New Password</Label>
                      <Input
                        name="password"
                        value={validation.values.password || ""}
                        type="password"
                        placeholder="**********"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        invalid={
                          validation.touched.password && validation.errors.password ? true : false
                        }
                      />
                      {validation.touched.password && validation.errors.password ? (
                        <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                      ) : null}
                    </div>

                  </CardBody>
                </Card>
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
  );
};

export default ChangePassword;
