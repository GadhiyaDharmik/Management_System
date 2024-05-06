import PropTypes from "prop-types"
import React from "react"
import {
  Col,
  Modal,
  ModalBody,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  ModalHeader,
  FormFeedback,
} from "reactstrap"

// Formik Validation
import * as Yup from "yup"
import { Formik, useFormik } from "formik"

const DepartmentModal = ({ show, onCloseClick, id }) => {
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      name: "",
      address: "",
      totalEmployee: "",
    },
    validationSchema: Yup.object({
      name: Yup.string("Enter a Department Name").required(
        "Please Enter a Department Name"
      ),
      address: Yup.string("Enter Department Address").required(
        "Please Enter a Department Address"
      ),
      totalEmployee: Yup.string("Enter TotalEmployee Of Department").required(
        "Please Enter a TotalEmployee Of Department"
      ),
    }),
    onSubmit: (values, {resetForm}) => {
      console.log(values)
      resetForm()
    },
  })
  return (
    <Modal isOpen={show} centered={true}>
            <ModalHeader>Add Department</ModalHeader>
      <ModalBody>
        <Form
          className="form-horizontal floating-form my-account"
          onSubmit={e => {
            e.preventDefault()
            validation.handleSubmit()
            return false
          }}
        >
          <Row>
            <Col lg="6">
              <FormGroup floating>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.name || ""}
                  invalid={
                    validation.touched.name && validation.errors.name
                      ? true
                      : false
                  }
                  style={{
                    border: `${
                      validation.touched.name && validation.errors.name
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                  }}
                  placeholder="User Name"
                />
                <Label
                  for="name"
                  style={{
                    color: `${
                      validation.touched.name && validation.errors.name
                        ? "#ff6666"
                        : ""
                    }`,
                  }}
                >
                  Department Name
                </Label>
                {validation.touched.name && validation.errors.name ? (
                  <FormFeedback type="invalid">
                    {validation.errors.name}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup floating>
                <Input
                  type="text"
                  id="totalEmployee"
                  name="totalEmployee"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.totalEmployee || ""}
                  invalid={
                    validation.touched.totalEmployee &&
                    validation.errors.totalEmployee
                      ? true
                      : false
                  }
                  style={{
                    border: `${
                      validation.touched.totalEmployee &&
                      validation.errors.totalEmployee
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                  }}
                  placeholder="User Name"
                />
                <Label
                  for="totalEmployee"
                  style={{
                    color: `${
                      validation.touched.totalEmployee &&
                      validation.errors.totalEmployee
                        ? "#ff6666"
                        : ""
                    }`,
                  }}
                >
                  Total Employee
                </Label>
                {validation.touched.totalEmployee &&
                validation.errors.totalEmployee ? (
                  <FormFeedback type="invalid">
                    {validation.errors.totalEmployee}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup floating>
                <Input
                  type="textarea"
                  id="address"
                  name="address"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.address || ""}
                  invalid={
                    validation.touched.address && validation.errors.address
                      ? true
                      : false
                  }
                  style={{
                    border: `${
                      validation.touched.address && validation.errors.address
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                  }}
                  placeholder="User Name"
                />
                <Label
                  for="address"
                  style={{
                    color: `${
                      validation.touched.address && validation.errors.address
                        ? "#ff6666"
                        : ""
                    }`,
                  }}
                >
                  Department Address
                </Label>
                {validation.touched.address && validation.errors.address ? (
                  <FormFeedback type="invalid">
                    {validation.errors.address}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="text-center mt-3">
                <button
                  type="submit"
                  className="btn bg-success btn-lg ms-2"
                >
                  {id ? "Update Department" : "Add Department"}
                </button>
                <button
                  type="button"
                  className="btn bg-danger btn-lg ms-2"
                  onClick={onCloseClick}
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

DepartmentModal.propTypes = {
  onCloseClick: PropTypes.func,
  show: PropTypes.any,
}

export default DepartmentModal
