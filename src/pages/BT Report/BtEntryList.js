import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"

import InputGroup from "react-bootstrap/InputGroup"

import "bootstrap/dist/css/bootstrap.min.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import {
  Col,
  Card,
  CardBody,
  Row,
  Form,
  Label,
  Input,
  FormFeedback,
  Button,
  CardHeader,
} from "reactstrap"
import Select from "react-select"

// const customStyles = {
//   control: base => ({
//     ...base,
//     border: "1px",
//    
//   }),
// }
const customStyles = {
  control: base => ({
    ...base,
    border: "1px",
  }),
}

const optionGroup = [
  {
    label: "Status",
    options: [
      { label: "Login", value: "Login" },
      { label: "Rejected", value: "Rejected" },
      { label: "Pandding", value: "Pandding" },
    ],
  },
]

const optionReminder = [
  {
    label: "Reminder",
    options: [
      { label: "1 Day", value: "1" },
      { label: "2 Day", value: "2" },
      { label: "3 Day", value: "3" },
    ],
  },
]

function BtEntryList() {
  const [selectedGroup, setselectedGroup] = useState(null)
  const [selectedMulti1, setselectedMulti1] = useState(null)

  function handleSelectGroup(selectedGroup) {
    setselectedGroup(selectedGroup)
  }
  function handleMulti1(selectedMulti1) {
    setselectedMulti1(selectedMulti1)
  }
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      compnyName: "",
      compnyReferance: "",
      numberOfCustomer: "",
      mobile: "",
      chequeCollection: "",
      chequeDeposite: "",
      chequeNumber: "",
      amount: "",
      paperCollection: "",
      paperHandover: "",
      btBank: "",
      extraEmail1: "",
      extraEmail2: "",
      extraEmail3: "",
    },
    validationSchema: Yup.object({
      compnyName: Yup.string().required("Please Enter YourCompny Name"),
      compnyReferance: Yup.string().required(
        "Please Enter Your Compny Referance"
      ),
      numberOfCustomer: Yup.string().required(
        "Please Enter Number of Customer"
      ),
      mobile: Yup.string().required("Please Enter Your mobile "),
      chequeCollection: Yup.string().required(
        "Please Enter Your Cheque Collection"
      ),
      chequeDeposite: Yup.string().required(
        "Please Enter Your Cheque Deposite"
      ),
      chequeCollection: Yup.string().required(
        "Please Enter Your Cheque Collection"
      ),
      chequeNumber: Yup.string().required("Please Enter Your Cheque Number"),
      paperCollection: Yup.string().required("Please Enter Paper Collection"),
      paperHandover: Yup.string().required("Please Enter Paper Handover"),
      amount: Yup.string().required("Please Enter Your Amount"),
      btBank: Yup.string().required("Please Enter Your BT Bank"),
    }),
    onSubmit: values => {
      console.log("values", values)
    },
  })

  const handleClose = () => {
    validation.resetForm()
    onCloseClick()
  }
  /////////////////////////////////////////////////////////////////

  return (
    <React.Fragment>
      <div className="page-content dashboard">
        <div className="container-fluid">
          <Card>
            <CardHeader className="bg-transparent">
              <span className="fs-2 fw-bold">BT Reports</span>
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
                  <Col md="3">
                    <div className="mb-3 position-relative">
                      <Label htmlFor="validationTooltipUsername">
                        Compny Name
                      </Label>
                      <div className="input-group">
                        <div
                          className="input-group-text"
                          style={{
                            WebkitBorderTopLeftRadius: "24px ",
                            WebkitBorderBottomLeftRadius: "24px",
                          }}
                          id="validationTooltipUsernamePrepend"
                        >
                          <i className="dripicons-home" />
                        </div>

                        <Input
                          name="compnyName"
                          placeholder="Compny Name"
                          type="text"
                          className="form-control"
                          style={{ borderRadius: "0px" }}
                          id="validationTooltipUsername"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.compnyName || ""}
                          invalid={
                            validation.touched.compnyName &&
                            validation.errors.compnyName
                              ? true
                              : false
                          }
                        />
                        {validation.touched.compnyName &&
                        validation.errors.compnyName ? (
                          <FormFeedback type="invalid">
                            {validation.errors.compnyName}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mb-3 position-relative">
                      <Label htmlFor="validationTooltipUsername">
                        Compny Referance
                      </Label>
                      <div className="input-group">
                        <div
                          className="input-group-text"
                          style={{
                            WebkitBorderTopLeftRadius: "24px ",
                            WebkitBorderBottomLeftRadius: "24px",
                          }}
                          id="validationTooltipUsernamePrepend"
                        >
                          <i className="dripicons-home" />
                        </div>
                        <Input
                          name="compnyReferance"
                          placeholder="Compny Referance"
                          type="text"
                          className="form-control"
                          id="validationCustom01"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.compnyReferance || ""}
                          invalid={
                            validation.touched.compnyReferance &&
                            validation.errors.compnyReferance
                              ? true
                              : false
                          }
                        />
                        {validation.touched.compnyReferance &&
                        validation.errors.compnyReferance ? (
                          <FormFeedback type="invalid">
                            {validation.errors.compnyReferance}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mb-3 position-relative">
                      <Label htmlFor="validationTooltipUsername">
                        Number of Customer
                      </Label>
                      <div className="input-group">
                        <div
                          className="input-group-text"
                          style={{
                            WebkitBorderTopLeftRadius: "24px ",
                            WebkitBorderBottomLeftRadius: "24px",
                          }}
                          id="validationTooltipUsernamePrepend"
                        >
                          <i className="dripicons-user" />
                        </div>
                        <Input
                          name="numberOfCustomer"
                          placeholder="new Customer"
                          type="text"
                          className="form-control"
                          id="validationCustom01"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.numberOfCustomer || ""}
                          invalid={
                            validation.touched.numberOfCustomer &&
                            validation.errors.numberOfCustomer
                              ? true
                              : false
                          }
                        />
                        {validation.touched.numberOfCustomer &&
                        validation.errors.numberOfCustomer ? (
                          <FormFeedback type="invalid">
                            {validation.errors.numberOfCustomer}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mb-3 position-relative">
                      <Label htmlFor="validationTooltipUsername">
                        Mobile Number
                      </Label>
                      <div className="input-group">
                        <div
                          className="input-group-text"
                          style={{
                            WebkitBorderTopLeftRadius: "24px ",
                            WebkitBorderBottomLeftRadius: "24px",
                          }}
                          id="validationTooltipUsernamePrepend"
                        >
                          <i className="dripicons-phone" />
                        </div>

                        <Input
                          name="mobile"
                          placeholder="Customer Mobile Number"
                          type="text"
                          className="form-control"
                          id="validationCustom01"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.mobile || ""}
                          invalid={
                            validation.touched.mobile &&
                            validation.errors.mobile
                              ? true
                              : false
                          }
                        />
                        {validation.touched.mobile &&
                        validation.errors.mobile ? (
                          <FormFeedback type="invalid">
                            {validation.errors.mobile}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="3">
                    <div className="mb-3 position-relative">
                      <Label htmlFor="validationTooltipUsername">
                        Cheque Collection
                      </Label>
                      <div className="input-group">
                        <div
                          className="input-group-text"
                          style={{
                            WebkitBorderTopLeftRadius: "24px ",
                            WebkitBorderBottomLeftRadius: "24px",
                          }}
                          id="validationTooltipUsernamePrepend"
                        >
                          <i className="dripicons-checklist" />
                        </div>
                        <Input
                          name="chequeCollection"
                          type="date"
                          className="form-control"
                          id="validationCustom01"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.chequeCollection || ""}
                          invalid={
                            validation.touched.chequeCollection &&
                            validation.errors.chequeCollection
                              ? true
                              : false
                          }
                        />
                        {validation.touched.chequeCollection &&
                        validation.errors.chequeCollection ? (
                          <FormFeedback type="invalid">
                            {validation.errors.chequeCollection}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mb-3 position-relative">
                      <Label htmlFor="validationTooltipUsername">
                        Cheque Deposite
                      </Label>
                      <div className="input-group">
                        <div
                          className="input-group-text"
                          style={{
                            WebkitBorderTopLeftRadius: "24px ",
                            WebkitBorderBottomLeftRadius: "24px",
                          }}
                          id="validationTooltipUsernamePrepend"
                        >
                          <i className="dripicons-checklist" />
                        </div>
                        <Input
                          name="chequeDeposite"
                          type="date"
                          className="form-control"
                          id="validationCustom01"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.chequeDeposite || ""}
                          invalid={
                            validation.touched.chequeDeposite &&
                            validation.errors.chequeDeposite
                              ? true
                              : false
                          }
                        />
                        {validation.touched.chequeDeposite &&
                        validation.errors.chequeDeposite ? (
                          <FormFeedback type="invalid">
                            {validation.errors.chequeDeposite}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mb-3 position-relative">
                      <Label htmlFor="validationTooltipUsername">
                        Cheque Number
                      </Label>
                      <div
                        className="input-group"
                        style={{ borderRadius: "0px" }}
                      >
                        <div
                          className="input-group-text"
                          style={{
                            WebkitBorderTopLeftRadius: "24px ",
                            WebkitBorderBottomLeftRadius: "24px",
                          }}
                          id="validationTooltipUsernamePrepend"
                        >
                          <i className="dripicons-checklist" />
                        </div>
                        <Input
                          name="chequeNumber"
                          type="number"
                          placeholder="0000"
                          className="form-control input-group-prepend"
                          id="validationCustom01"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.chequeNumber || ""}
                          invalid={
                            validation.touched.chequeNumber &&
                            validation.errors.chequeNumber
                              ? true
                              : false
                          }
                        />
                        {validation.touched.chequeNumber &&
                        validation.errors.chequeNumber ? (
                          <FormFeedback type="invalid">
                            {validation.errors.chequeNumber}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mb-3 input-group-prepend">
                      <Label htmlFor="validationTooltipUsername">Amount</Label>
                      <InputGroup>
                        <div
                          className="input-group-text"
                          style={{
                            WebkitBorderTopLeftRadius: "24px ",
                            WebkitBorderBottomLeftRadius: "24px",
                          }}
                        >
                          <i className="bx bx-dollar"></i>
                        </div>
                        <Input
                          name="amount"
                          type="number"
                          placeholder="0000"
                          className="form-control"
                          id="validationCustom01"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.amount || ""}
                          invalid={
                            validation.touched.amount &&
                            validation.errors.amount
                              ? true
                              : false
                          }
                        />
                        {validation.touched.amount &&
                        validation.errors.amount ? (
                          <FormFeedback type="invalid">
                            {validation.errors.amount}
                          </FormFeedback>
                        ) : null}
                      </InputGroup>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="3">
                    <div className="mb-3 input-group-prepend">
                      <Label htmlFor="validationTooltipUsername">
                        Paper Collection
                      </Label>
                      <InputGroup>
                        <div
                          className="input-group-text"
                          style={{
                            WebkitBorderTopLeftRadius: "24px ",
                            WebkitBorderBottomLeftRadius: "24px",
                          }}
                        >
                          <i className="bx bx-calendar"></i>
                        </div>
                        <Input
                          name="paperCollection"
                          placeholder="Paper Collection"
                          type="date"
                          className="form-control"
                          id="validationCustom01"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.paperCollection || ""}
                          invalid={
                            validation.touched.paperCollection &&
                            validation.errors.paperCollection
                              ? true
                              : false
                          }
                        />
                        {validation.touched.paperCollection &&
                        validation.errors.paperCollection ? (
                          <FormFeedback type="invalid">
                            {validation.errors.paperCollection}
                          </FormFeedback>
                        ) : null}
                      </InputGroup>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mb-3 input-group-prepend">
                      <Label htmlFor="validationTooltipUsername">
                        Paper Handover
                      </Label>
                      <InputGroup>
                        <div
                          className="input-group-text"
                          style={{
                            WebkitBorderTopLeftRadius: "24px ",
                            WebkitBorderBottomLeftRadius: "24px",
                          }}
                        >
                          <i className="bx bx-calendar"></i>
                        </div>
                        <Input
                          name="paperHandover"
                          placeholder=" Paper Collection"
                          type="date"
                          className="form-control"
                          id="validationCustom01"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.paperHandover || ""}
                          invalid={
                            validation.touched.paperHandover &&
                            validation.errors.paperHandover
                              ? true
                              : false
                          }
                        />
                        {validation.touched.paperHandover &&
                        validation.errors.paperHandover ? (
                          <FormFeedback type="invalid">
                            {validation.errors.paperHandover}
                          </FormFeedback>
                        ) : null}
                      </InputGroup>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mb-3 input-group-prepend">
                      <Label htmlFor="validationTooltipUsername">BT Bank</Label>
                      <InputGroup>
                        <div
                          className="input-group-text"
                          style={{
                            WebkitBorderTopLeftRadius: "24px ",
                            WebkitBorderBottomLeftRadius: "24px",
                          }}
                        >
                          <i className="bx bxs-bank"></i>
                        </div>
                        <Input
                          name="btBank"
                          placeholder="Bank Name"
                          type="text"
                          className="form-control"
                          id="validationCustom01"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.btBank || ""}
                          invalid={
                            validation.touched.btBank &&
                            validation.errors.btBank
                              ? true
                              : false
                          }
                        />
                        {validation.touched.btBank &&
                        validation.errors.btBank ? (
                          <FormFeedback type="invalid">
                            {validation.errors.btBank}
                          </FormFeedback>
                        ) : null}
                      </InputGroup>
                    </div>
                  </Col>
                  <Col md="3">
                    <Label>BT Status</Label>
                    <div className="d-flex">
                      <div
                        className="input-group-text"
                        style={{
                          WebkitBorderTopLeftRadius: "24px ",
                          WebkitBorderBottomLeftRadius: "24px",
                          height: "56px",
                        }}
                      >
                        <i className="bx bx-file-blank"></i>
                      </div>
                      <Select
                        // id="validationCustom01"
                        styles={customStyles}
                        value={selectedMulti1}
                        onChange={() => {
                          handleMulti1()
                        }}
                        options={optionGroup}
                        className="form-control"
                      />
                      {validation.touched.btBank && validation.errors.btBank ? (
                        <FormFeedback type="invalid">
                          {validation.errors.btBank}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="3">
                    <div className="mb-3">
                      <Label>BT Reminder</Label>
                      <div className="d-flex">
                        <div
                          className="input-group-text"
                          style={{
                            WebkitBorderTopLeftRadius: "24px ",
                            WebkitBorderBottomLeftRadius: "24px",
                          }}
                        >
                          <i className="bx bx-time"></i>
                        </div>
                        <Select
                          // id="validationCustom01"
                          styles={customStyles}
                          value={selectedMulti1}
                          onChange={() => {
                            handleMulti1()
                          }}
                          options={optionReminder}
                          className="form-control"
                        />
                        {validation.touched.btBank &&
                        validation.errors.btBank ? (
                          <FormFeedback type="invalid">
                            {validation.errors.btBank}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mb-3 input-group-prepend">
                      <Label htmlFor="validationTooltipUsername">
                        Extra Email 1
                      </Label>
                      <InputGroup>
                        <div
                          className="input-group-text"
                          style={{
                            WebkitBorderTopLeftRadius: "24px ",
                            WebkitBorderBottomLeftRadius: "24px",
                          }}
                        >
                          @{" "}
                        </div>
                        <Input
                          name="extraEmail1"
                          placeholder="example@example.com"
                          type="text"
                          className="form-control"
                          id="validationCustom01"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.extraEmail1 || ""}
                          invalid={
                            validation.touched.extraEmail1 &&
                            validation.errors.extraEmail1
                              ? true
                              : false
                          }
                        />
                        {validation.touched.extraEmail1 &&
                        validation.errors.extraEmail1 ? (
                          <FormFeedback type="invalid">
                            {validation.errors.extraEmail1}
                          </FormFeedback>
                        ) : null}
                      </InputGroup>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mb-3 input-group-prepend">
                      <Label htmlFor="validationTooltipUsername">
                        Extra Email 2
                      </Label>
                      <InputGroup>
                        <div
                          className="input-group-text"
                          style={{
                            WebkitBorderTopLeftRadius: "24px ",
                            WebkitBorderBottomLeftRadius: "24px",
                          }}
                        >
                          @
                        </div>
                        <Input
                          name="extraEmail2"
                          placeholder="example@example.com"
                          type="text"
                          className="form-control"
                          id="validationCustom01"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.extraEmail2 || ""}
                          invalid={
                            validation.touched.extraEmail2 &&
                            validation.errors.extraEmail2
                              ? true
                              : false
                          }
                        />
                        {validation.touched.extraEmail2 &&
                        validation.errors.extraEmail2 ? (
                          <FormFeedback type="invalid">
                            {validation.errors.extraEmail2}
                          </FormFeedback>
                        ) : null}
                      </InputGroup>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mb-3 input-group-prepend">
                      <Label htmlFor="validationTooltipUsername">
                        Extra Email 3
                      </Label>
                      <InputGroup>
                        <div
                          className="input-group-text"
                          style={{
                            WebkitBorderTopLeftRadius: "24px ",
                            WebkitBorderBottomLeftRadius: "24px",
                          }}
                        >
                          @
                        </div>
                        <Input
                          name="extraEmail3"
                          placeholder="example@example.com"
                          type="text"
                          className="form-control"
                          id="validationCustom01"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.extraEmail3 || ""}
                          invalid={
                            validation.touched.extraEmail3 &&
                            validation.errors.extraEmail3
                              ? true
                              : false
                          }
                        />
                        {validation.touched.extraEmail3 &&
                        validation.errors.extraEmail3 ? (
                          <FormFeedback type="invalid">
                            {validation.errors.extraEmail3}
                          </FormFeedback>
                        ) : null}
                      </InputGroup>
                    </div>
                  </Col>
                </Row>
                <Row></Row>
                <Button color="primary" type="submit">
                  Submit form
                </Button>
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
