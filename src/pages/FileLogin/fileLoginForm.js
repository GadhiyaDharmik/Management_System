import React, { useState } from "react"
import PropTypes from "prop-types"

import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  Label,
  Input,
  Container,
  FormFeedback,
  Form,
  CardHeader,
  CardTitle,
} from "reactstrap"

import pdfIcon from "./icons/pdf-svgrepo-com.svg"
import docIcon from "./icons/word-svgrepo-com.svg"
import fileOpen from "./icons/file-upload-svgrepo-com.svg"
import sheetsIcon from "./icons/sheets 123.svg"

//For File Upload
import Dropzone from "react-dropzone"

import { Link, useNavigate } from "react-router-dom"

// Formik validation
import * as Yup from "yup"
import { useFormik } from "formik"

const FormValidations = props => {
  const [selectedFiles, setselectedFiles] = useState([])
  const navigate = useNavigate()
  // Form validation
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      document: selectedFiles ? selectedFiles : "",
      documentNumber: 1,
      customerName: "",
      customerMobilenumber: "",
      bankName: "",
      paymentDetails: "",
      dateOfTokenExecution: "",
      zone: "",
      handoverName: "",
      deedNumber: "",
      handoverDate: "",
      propertyDiscription: "",
    },
    validationSchema: Yup.object().shape({
      customerName: Yup.string().required("Please Enter customerName"),
      customerMobilenumber: Yup.number("Please Enter a valid Mobile Number")
        .min(10)
        .required("Please Enter Customer Mobile Number"),
      bankName: Yup.string().required("Please Enter Bank Name"),
      paymentDetails: Yup.string().required(
        "Please Enter your Payment Details"
      ),
      dateOfTokenExecution: Yup.string().required(
        "Please Enter your Date Of Token"
      ),
      deedNumber: Yup.number("Please Enter a valid  Number").required(
        "Please Enter Deed Number"
      ),
      zone: Yup.string("Please Enter a valid zone").required(
        "Please Enter zone"
      ),
      handoverName: Yup.string("Please Enter a valid Handover Name").required(
        "Please Enter Handover Name"
      ),
      handoverDate: Yup.string("Please Enter a valid Handover Date").required(
        "Please Enter Handover Date"
      ),
      propertyDiscription: Yup.string(
        "Please Enter a valid Property Discription"
      ).required("Please Enter Property Discription"),
    }),
    onSubmit: values => {
      console.log("values", values)
    },
  })

  function handleAcceptedFiles(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )
    setselectedFiles(files)
  }

  /**
   * Formats the size
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  return (
    <>
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Form
              onSubmit={e => {
                e.preventDefault()
                validationType.handleSubmit()
                return false
              }}
              className="custom-validation"
            >
              <Card>
                <CardHeader>
                  <span className="fs-3"> File Login</span>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col lg={4} sm={12} xs={12}>
                      <Dropzone
                        onDrop={acceptedFiles => {
                          handleAcceptedFiles(acceptedFiles)
                        }}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div className="dropzone">
                            <div
                              className="dz-message needsclick"
                              {...getRootProps()}
                            >
                              <input {...getInputProps()} />
                              <div className="mb-3">
                                <i className="display-4 text-muted uil uil-cloud-upload" />
                              </div>
                              <h4>click to upload File.</h4>
                            </div>
                          </div>
                        )}
                      </Dropzone>
                      <div
                        className="dropzone-previews mt-3"
                        id="file-previews"
                      >
                        {selectedFiles.map((f, i) => {
                          return (
                            <Card
                              className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                              key={(i, "-file")}
                            >
                              <div className="p-2">
                                <Row className="align-items-center">
                                  <Col className="col-auto">
                                    <img
                                      data-dz-thumbnail=""
                                      height="80"
                                      className="avatar-sm rounded bg-light"
                                      alt={f.name}
                                      src={
                                        f.type == "text/csv"
                                          ? sheetsIcon
                                          : f.type == "application/pdf"
                                          ? pdfIcon
                                          : f.type ==
                                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                          ? docIcon
                                          : fileOpen
                                      }
                                    />
                                  </Col>
                                  <Col>
                                    <Link
                                      to="#"
                                      className="text-muted font-weight-bold"
                                    >
                                      {f.name}
                                    </Link>
                                    <p className="mb-0">
                                      <strong>{f.formattedSize}</strong>
                                    </p>
                                  </Col>
                                </Row>
                              </div>
                            </Card>
                          )
                        })}
                      </div>
                    </Col>
                    <Col lg={8}>
                      <Row>
                        <Col lg={6} sm={6} xs={12}>
                          <div className="mb-3">
                            <Label className="form-label">
                              Documents Number
                            </Label>
                            <div className="input-group">
                              <Input
                                name="documentNumber"
                                placeholder="Documents Number"
                                type="number"
                                readOnly
                                // onChange={validationType.handleChange}
                                // onBlur={validationType.handleBlur}
                                value={
                                  validationType.values.documentNumber || ""
                                }
                                // invalid={
                                //   validationType.touched.documentNumber &&
                                //   validationType.errors.documentNumber
                                //     ? true
                                //     : false
                                // }
                              />
                              {/* {validationType.touched.documentNumber &&
                              validationType.errors.documentNumber ? (
                                <FormFeedback type="invalid">
                                  {validationType.errors.documentNumber}
                                </FormFeedback>
                              ) : null} */}
                            </div>
                          </div>
                        </Col>
                        <Col lg={6} sm={6} xs={12}>
                          <div className="mb-3">
                            <Label className="form-label">Customer Name</Label>
                            <div className="input-group">
                              <Input
                                name="customerName"
                                placeholder="Customer Name"
                                type="text"
                                onChange={validationType.handleChange}
                                onBlur={validationType.handleBlur}
                                value={validationType.values.customerName || ""}
                                invalid={
                                  validationType.touched.customerName &&
                                  validationType.errors.customerName
                                    ? true
                                    : false
                                }
                              />
                              {validationType.touched.customerName &&
                              validationType.errors.customerName ? (
                                <FormFeedback type="invalid">
                                  {validationType.errors.customerName}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </div>
                        </Col>
                        <Col lg={6} sm={6} xs={12}>
                          <div className="mb-3">
                            <Label className="form-label">
                              Customer Mobile Number
                            </Label>
                            <div className="input-group">
                              <Input
                                name="customerMobilenumber"
                                placeholder="Enter Only number"
                                type="number"
                                onChange={validationType.handleChange}
                                onBlur={validationType.handleBlur}
                                value={
                                  validationType.values.customerMobilenumber ||
                                  ""
                                }
                                invalid={
                                  validationType.touched.customerMobilenumber &&
                                  validationType.errors.customerMobilenumber
                                    ? true
                                    : false
                                }
                              />
                              {validationType.touched.customerMobilenumber &&
                              validationType.errors.customerMobilenumber ? (
                                <FormFeedback type="invalid">
                                  {validationType.errors.customerMobilenumber}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </div>
                        </Col>
                        <Col lg={6} sm={6} xs={12}>
                          <div className="mb-3">
                            <Label className="form-label">Bank Name</Label>
                            <div className="input-group">
                              <Input
                                name="bankName"
                                placeholder="Bank Name"
                                type="text"
                                onChange={validationType.handleChange}
                                onBlur={validationType.handleBlur}
                                value={validationType.values.bankName || ""}
                                invalid={
                                  validationType.touched.bankName &&
                                  validationType.errors.bankName
                                    ? true
                                    : false
                                }
                              />
                              {validationType.touched.bankName &&
                              validationType.errors.bankName ? (
                                <FormFeedback type="invalid">
                                  {validationType.errors.bankName}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={12}>
                      <Row>
                        <Col lg={4} sm={6} xs={12}>
                          <div className="mb-3">
                            <Label className="form-label">
                              Payment Details
                            </Label>
                            <div className="input-group">
                              <Input
                                name="paymentDetails"
                                placeholder="Payment Details"
                                type="text"
                                onChange={validationType.handleChange}
                                onBlur={validationType.handleBlur}
                                value={
                                  validationType.values.paymentDetails || ""
                                }
                                invalid={
                                  validationType.touched.paymentDetails &&
                                  validationType.errors.paymentDetails
                                    ? true
                                    : false
                                }
                              />
                              {validationType.touched.paymentDetails &&
                              validationType.errors.paymentDetails ? (
                                <FormFeedback type="invalid">
                                  {validationType.errors.paymentDetails}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </div>
                        </Col>
                        <Col lg={4} sm={6} xs={12}>
                          <div className="mb-3">
                            <Label className="form-label">
                              Date of taken for Execution
                            </Label>
                            <div className="input-group">
                              <Input
                                name="dateOfTokenExecution"
                                label="Date of taken for Execution"
                                placeholder="Enter Only Digits"
                                type="date"
                                onChange={validationType.handleChange}
                                onBlur={validationType.handleBlur}
                                value={
                                  validationType.values.dateOfTokenExecution ||
                                  ""
                                }
                                invalid={
                                  validationType.touched.dateOfTokenExecution &&
                                  validationType.errors.dateOfTokenExecution
                                    ? true
                                    : false
                                }
                              />
                              {validationType.touched.dateOfTokenExecution &&
                              validationType.errors.dateOfTokenExecution ? (
                                <FormFeedback type="invalid">
                                  {validationType.errors.dateOfTokenExecution}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </div>
                        </Col>
                        <Col lg={4} sm={6} xs={12}>
                          <div className="mb-3">
                            <Label className="form-label">Deed Number</Label>
                            <div className="input-group">
                              <Input
                                name="deedNumber"
                                placeholder="Deed number"
                                type="number"
                                onChange={validationType.handleChange}
                                onBlur={validationType.handleBlur}
                                value={validationType.values.deedNumber || ""}
                                invalid={
                                  validationType.touched.deedNumber &&
                                  validationType.errors.deedNumber
                                    ? true
                                    : false
                                }
                              />
                              {validationType.touched.deedNumber &&
                              validationType.errors.deedNumber ? (
                                <FormFeedback type="invalid">
                                  {validationType.errors.deedNumber}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </div>
                        </Col>
                        <Col lg={4} sm={6} xs={12}>
                          <div className="mb-3">
                            <Label className="form-label">Zone</Label>
                            <div className="input-group">
                              <Input
                                name="zone"
                                placeholder="Zone"
                                type="text"
                                onChange={validationType.handleChange}
                                onBlur={validationType.handleBlur}
                                value={validationType.values.zone || ""}
                                invalid={
                                  validationType.touched.zone &&
                                  validationType.errors.zone
                                    ? true
                                    : false
                                }
                              />
                              {validationType.touched.zone &&
                              validationType.errors.zone ? (
                                <FormFeedback type="invalid">
                                  {validationType.errors.zone}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </div>
                        </Col>
                        <Col lg={4} sm={6} xs={12}>
                          <div className="mb-3">
                            <Label className="form-label">Handover name</Label>
                            <div className="input-group">
                              <Input
                                name="handoverName"
                                placeholder="Handover Name"
                                type="text"
                                onChange={validationType.handleChange}
                                onBlur={validationType.handleBlur}
                                value={validationType.values.handoverName || ""}
                                invalid={
                                  validationType.touched.handoverName &&
                                  validationType.errors.handoverName
                                    ? true
                                    : false
                                }
                              />
                              {validationType.touched.handoverName &&
                              validationType.errors.handoverName ? (
                                <FormFeedback type="invalid">
                                  {validationType.errors.handoverName}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </div>
                        </Col>
                        <Col lg={4} sm={6} xs={12}>
                          <div className="mb-3">
                            <Label className="form-label">Handover Date</Label>
                            <div className="input-group">
                              <Input
                                name="handoverDate"
                                placeholder="Handover Date"
                                type="date"
                                onChange={validationType.handleChange}
                                onBlur={validationType.handleBlur}
                                value={validationType.values.handoverDate || ""}
                                invalid={
                                  validationType.touched.handoverDate &&
                                  validationType.errors.handoverDate
                                    ? true
                                    : false
                                }
                              />
                              {validationType.touched.handoverDate &&
                              validationType.errors.handoverDate ? (
                                <FormFeedback type="invalid">
                                  {validationType.errors.handoverDate}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </div>
                        </Col>
                        <Col lg={6} sm={4} xs={12}></Col>
                        <Col lg={12} sm={12} xs={12}>
                          <div className="mb-3">
                            <Label className="form-label">
                              Property Discription
                            </Label>
                            <div className="input-group">
                              <Input
                                name="propertyDiscription"
                                placeholder="Property Discription"
                                type="textarea"
                                rows="5"
                                onChange={validationType.handleChange}
                                onBlur={validationType.handleBlur}
                                value={
                                  validationType.values.propertyDiscription ||
                                  ""
                                }
                                invalid={
                                  validationType.touched.propertyDiscription &&
                                  validationType.errors.propertyDiscription
                                    ? true
                                    : false
                                }
                              />
                              {validationType.touched.propertyDiscription &&
                              validationType.errors.propertyDiscription ? (
                                <FormFeedback type="invalid">
                                  {validationType.errors.propertyDiscription}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </div>
                        </Col>
                        <Col lg={4} sm={6} xs={12} className="text-start">
                          <div className="mb-3 fs-3">
                            <input
                              type="checkbox"
                              className="form-input"
                              id="checkbox_1"
                              onChange={() => {
                                console.log(props)
                              }}
                            />
                            <label
                              className="form-check-label ps-2 fs-5"
                              htmlFor="checkbox_1"
                            >
                              Send To Mail
                            </label>
                          </div>
                        </Col>
                        <div className="d-flex flex-wrap gap-2 flex-row-reverse">
                          <Button type="submit" color="primary" className="">
                            Submit
                          </Button>
                          <Button
                            onClick={() => navigate("/file-login")}
                            type="reset"
                            color="secondary"
                            className=""
                          >
                            Cancel
                          </Button>
                        </div>
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Form>
          </Container>
        </div>
      </React.Fragment>
    </>
  )
}

export default FormValidations
