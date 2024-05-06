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
  InputGroup,
  FormFeedback,
  ModalHeader,
} from "reactstrap"
import {
  addBranch,
} from "../../store/actions"

//Date Picker
import Flatpickr from "react-flatpickr"

// Formik Validation
import * as Yup from "yup"
import { Formik, useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { Hidden } from "@material-ui/core"

const BranchModal = ({ show, onCloseClick, id }) => {
  const dispatch = useDispatch()
  const branchData = useSelector((state) => state.branch.branchData)
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: branchData,
    validationSchema: Yup.object({

      name: Yup.string("Enter a Branch Name").required(
        "Please Enter a Branch Name"
      ),
      number: Yup.number("Enter a Branch Number").required(
        "Please Enter a Branch Number"
      ),
      address: Yup.string("Enter Branch Address").required(
        "Please Enter a Branch Address"
      ),
      totalEmployee: Yup.number("Enter TotalEmployee").required(
        "Please Enter a TotalEmployee"
      ),
    }),
    onSubmit: (values, resetForm) => {
      dispatch(addBranch(values))
      onCloseClick()
      resetForm()
    },
  })

  const handleClose=()=>{
    validation.resetForm()
    onCloseClick()
  }
  return (
    <Modal isOpen={show} centered={true}>
      <ModalHeader>Add Branch</ModalHeader>
      <ModalBody>
        <Form
          noValidate
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
                    border: `${validation.touched.name && validation.errors.name
                      ? "solid 1px #ff6666"
                      : ""
                      }`,
                  }}
                  placeholder="User Name"
                />
                <Label
                  for="name"
                  style={{
                    color: `${validation.touched.name && validation.errors.name
                      ? "#ff6666"
                      : ""
                      }`,
                  }}
                >
                  Branch Name
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
                  type="number"
                  id="number"
                  name="number"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.number || ""}
                  invalid={
                    validation.touched.number && validation.errors.number
                      ? true
                      : false
                  }
                  style={{
                    border: `${validation.touched.number && validation.errors.number
                      ? "solid 1px #ff6666"
                      : ""
                      }`,
                  }}
                  placeholder="Branch Number"
                />
                <Label
                  for="number"
                  style={{
                    color: `${validation.touched.number && validation.errors.number
                      ? "#ff6666"
                      : ""
                      }`,
                  }}
                >
                  Branch Mobile Number
                </Label>
                {validation.touched.number && validation.errors.number ? (
                  <FormFeedback type="invalid">
                    {validation.errors.number}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup floating>
                <Input
                  type="number"
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
                    border: `${validation.touched.totalEmployee &&
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
                    color: `${validation.touched.totalEmployee &&
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
                    border: `${validation.touched.address && validation.errors.address
                      ? "solid 1px #ff6666"
                      : ""
                      }`,
                  }}
                  placeholder="User Name"
                />
                <Label
                  for="address"
                  style={{
                    color: `${validation.touched.address && validation.errors.address
                      ? "#ff6666"
                      : ""
                      }`,
                  }}
                >
                  Branch Address
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
                <button type="submit" className="btn btn-success btn-lg ms-2">
                  {id ? "Update Branch" : "Add Branch"}
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-lg ms-2"
                  onClick={handleClose}
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

BranchModal.propTypes = {
  onCloseClick: PropTypes.func,
  show: PropTypes.any,
}

export default BranchModal
