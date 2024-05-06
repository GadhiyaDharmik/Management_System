import React, { useState } from "react"
import {
  Col,
  Modal,
  ModalBody,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  ModalHeader,
  Button,
  CardHeader,
  Card,
  CardBody,
} from "reactstrap"

// Formik Validation
import * as Yup from "yup"
import { useFormik, FormikProvider, FieldArray } from "formik"

//For File Upload
import Dropzone from "react-dropzone"

import { Link } from "react-router-dom"

import pdfIcon from "./icons/pdf-svgrepo-com.svg"
import docIcon from "./icons/word-svgrepo-com.svg"
import fileOpen from "./icons/file-upload-svgrepo-com.svg"
import sheetsIcon from "./icons/sheets 123.svg"

const BranchModal = ({ show, onCloseClick, data, id }) => {
  const [selectedFiles, setselectedFiles] = useState([])

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      Fees: "",
      email1: "",
      email2: "",
      email3: "",
      email4: "",
    },
    validationSchema: Yup.object({
      name: Yup.string("Enter a Compny Name").required("Please Enter a   Name"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values)
      resetForm()
      onCloseClick()
    },
  })
  const handleClose = () => {
    setselectedFiles([])    
    validation.resetForm()
    onCloseClick()
  }

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
    <Modal isOpen={show} toggle={onCloseClick} data={data} centered={true}>
      <ModalHeader> Compny</ModalHeader>
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
            <Col lg={12} sm={12} xs={12} style={{ cursor: "pointer" }}>
              <Dropzone
                onDrop={acceptedFiles => {
                  handleAcceptedFiles(acceptedFiles)
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <div className="dropzone">
                    <div className="dz-message needsclick" {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="mb-3">
                        <i className="display-4 text-muted uil uil-cloud-upload" />
                      </div>
                      <h4>click to upload File.</h4>
                    </div>
                  </div>
                )}
              </Dropzone>
              <div className="dropzone-previews mt-3" id="file-previews">
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
                  Compny Name
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
                  id="Fees"
                  name="Fees"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.Fees || ""}
                  invalid={
                    validation.touched.Fees && validation.errors.Fees
                      ? true
                      : false
                  }
                  style={{
                    border: `${
                      validation.touched.Fees && validation.errors.Fees
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                  }}
                  placeholder="User Name"
                />
                <Label
                  for="Fees"
                  style={{
                    color: `${
                      validation.touched.Fees && validation.errors.Fees
                        ? "#ff6666"
                        : ""
                    }`,
                  }}
                >
                  Fees
                </Label>
                {validation.touched.Fees && validation.errors.Fees ? (
                  <FormFeedback type="invalid">
                    {validation.errors.Fees}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup floating>
                <Input
                  type="email"
                  id="email1"
                  name="email1"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.email1 || ""}
                  invalid={
                    validation.touched.email1 && validation.errors.email1
                      ? true
                      : false
                  }
                  style={{
                    border: `${
                      validation.touched.email1 && validation.errors.email1
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                  }}
                  placeholder="User Name"
                />
                <Label
                  for="email1"
                  style={{
                    color: `${
                      validation.touched.email1 && validation.errors.email1
                        ? "#ff6666"
                        : ""
                    }`,
                  }}
                >
                  email1
                </Label>
                {validation.touched.email1 && validation.errors.email1 ? (
                  <FormFeedback type="invalid">
                    {validation.errors.email1}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup floating>
                <Input
                  type="email"
                  id="email2"
                  name="email2"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.email2 || ""}
                  invalid={
                    validation.touched.email2 && validation.errors.email2
                      ? true
                      : false
                  }
                  style={{
                    border: `${
                      validation.touched.email2 && validation.errors.email2
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                  }}
                  placeholder="User Name"
                />
                <Label
                  for="email2"
                  style={{
                    color: `${
                      validation.touched.email2 && validation.errors.email2
                        ? "#ff6666"
                        : ""
                    }`,
                  }}
                >
                  email2
                </Label>
                {validation.touched.email2 && validation.errors.email2 ? (
                  <FormFeedback type="invalid">
                    {validation.errors.email2}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup floating>
                <Input
                  type="email"
                  id="email3"
                  name="email3"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.email3 || ""}
                  invalid={
                    validation.touched.email3 && validation.errors.email3
                      ? true
                      : false
                  }
                  style={{
                    border: `${
                      validation.touched.email3 && validation.errors.email3
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                  }}
                  placeholder="User Name"
                />
                <Label
                  for="email3"
                  style={{
                    color: `${
                      validation.touched.email3 && validation.errors.email3
                        ? "#ff6666"
                        : ""
                    }`,
                  }}
                >
                  email3
                </Label>
                {validation.touched.email3 && validation.errors.email3 ? (
                  <FormFeedback type="invalid">
                    {validation.errors.email3}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup floating>
                <Input
                  type="email"
                  id="email4"
                  name="email4"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.email4 || ""}
                  invalid={
                    validation.touched.email4 && validation.errors.email4
                      ? true
                      : false
                  }
                  style={{
                    border: `${
                      validation.touched.email4 && validation.errors.email4
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                  }}
                  placeholder="User Name"
                />
                <Label
                  for="email4"
                  style={{
                    color: `${
                      validation.touched.email4 && validation.errors.email4
                        ? "#ff6666"
                        : ""
                    }`,
                  }}
                >
                  email4
                </Label>
                {validation.touched.email4 && validation.errors.email4 ? (
                  <FormFeedback type="invalid">
                    {validation.errors.email4}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Row>
              <Col>
                <div className="text-center mt-3">
                  <button type="submit" className="btn btn-success btn-lg ms-2">
                    {id ? "Update Compny" : "Add Compny"}
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
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  )
}
export default BranchModal
