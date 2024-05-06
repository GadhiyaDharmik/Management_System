import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

import "bootstrap/dist/css/bootstrap.min.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import {
  Col,
  Card,
  CardBody,
  Form,
  Label,
  Input,
  FormFeedback,
  FormGroup,
  CardHeader,
  Row,
} from "reactstrap"

//For File Upload
import Dropzone from "react-dropzone"

import { Link } from "react-router-dom"
import CardPricing from "../Utility/card-pricing"

function BtEntryList() {
  const [selectedFiles, setselectedFiles] = useState([])

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      title: "",
      discription: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Please Enter Your First Name"),
      lastname: Yup.string().required("Please Enter Your Last Name"),
      city: Yup.string().required("Please Enter Your City"),
      state: Yup.string().required("Please Enter Your State"),
      zip: Yup.string().required("Please Enter Your Zip"),
    }),
    onSubmit: values => {
      console.log("values", values)
    },
  })
  const handleClose = () => {
    validation.resetForm()
    onCloseClick()
  }

  function handleAcceptedFiles(files) {
    let allFiels = []
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )
    allFiels.push(files[0])
    console.log(allFiels)
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
    <React.Fragment>
      <div className="page-content dashboard">
        <div className="container-fluid">
          <Card>
            <CardHeader className="bg-transparent">
              <span className="fs-2 fw-bold">Add Product</span>
            </CardHeader>
            <CardBody>
              <Form
                className="needs-validation"
                onSubmit={e => {
                  e.preventDefault()
                  validation.handleSubmit()
                  return false
                }}
              >
                <Row>
                  <Col md="12" sm="12" xs="12">
                    <FormGroup className="mb-3">
                      <Label htmlFor="validationCustom01">First name</Label>
                      <Input
                        name="title"
                        placeholder="Title"
                        type="text"
                        className="form-control"
                        id="validationCustom01"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.title || ""}
                        invalid={
                          validation.touched.title && validation.errors.title
                            ? true
                            : false
                        }
                      />
                      {validation.touched.title && validation.errors.title ? (
                        <FormFeedback type="invalid">
                          {validation.errors.title}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col>
                  <Col md="12" sm="12" xs="12">
                    <Editor
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                    />
                  </Col>
                  <Col md="12" sm="12" xs="12">
                    <div className="dropzone-previews mt-3" id="file-previews">
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
                                    src={f.preview}
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
                </Row>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    </React.Fragment>
  )
}
BtEntryList.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default BtEntryList
