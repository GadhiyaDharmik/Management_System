import PropTypes from "prop-types"
import React from "react"
import {
  Col,
  Modal,
  ModalBody,
  Row,
  Input,
  Label,
  Alert,
  FormGroup,
  Form,
  FormFeedback,
  ModalHeader,
} from "reactstrap"

import avatar from "../../../../assets/images/small/img-7.jpg"

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-daterangepicker/daterangepicker.css"

import { Formik, useFormik } from "formik"
import * as Yup from "yup"

const IMAGEFORMATS = ["image/jpg", "image/jpeg", "image/png"]

const ProducrListModel = ({ show, onCloseClick, data, id, updateData }) => {
  const [profileImage, setProfileImage] = React.useState("")
  const [userProfile, setUserProfile] = React.useState("")

  React.useEffect(() => {
    data.image == 0 || data.image == undefined
      ? ""
      : setProfileImage(URL.createObjectURL(data.image[0]))
  }, [data])

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      variant: data == 0 || data ? data.variant : "",
      image: 0,
      price: data == 0 || data ? data.price : "",
      quantity: data == 0 || data ? data.quantity : "",
      available: data == 0 || data ? data.available : "",
      sku: data == 0 || data ? data.sku : "",
      barcode: data == 0 || data ? data.barcode : "",
    },

    validationSchema: Yup.object({
      variant: Yup.string("Please Enter Valid your variantName").required(
        "Please Enter A variantName"
      ),
      price: Yup.number("Please Enter Valid your Price").required(
        "Please Enter your Price"
      ),
      quantity: Yup.string("Please Enter Valid your Quint").required(
        "Please Enter your Quint"
      ),
      available: Yup.string(
        "Please Enter Valid your Available Product number"
      ).required("Please Enter your Product number"),
      sku: Yup.string("Please Enter Valid your SKU").required(
        "Please Enter your Quint"
      ),
      barcode: Yup.string("Please Enter Valid your Barcode").required(
        "Please Enter your Quint"
      ),
    }),
    onSubmit: (values, { resetForm }) => {
      // console.log("Updated Data :", values)
      updateData(values, id)
      setProfileImage("")
      resetForm()
      onCloseClick()
    },
  })

  //Handle Close Event
  const handleClose = () => {
    validation.resetForm()
    setProfileImage("")
    onCloseClick()
  }
  const onProfileSelect = e => {
    let format = IMAGEFORMATS.map(ele => ele.includes(e.target.files[0].type))
    if (format.includes(true)) {
      validation.setFieldValue("image", e.target.files)
      setProfileImage(URL.createObjectURL(e.target.files[0]))
    } else {
      return setUserProfile(
        "Image size is not minimum 5mb or Image format is none of this list (jpg,jpeg,png)."
      )
    }
  }
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalHeader>{"Update Detail Of" + " " + data.variant}</ModalHeader>
      <ModalBody>
        <div className="text-center ps-4 pe-5">
          <label htmlFor="upload-button">
            {profileImage ? (
              <img
                src={profileImage}
                alt="dummy"
                width="50%"
                style={{
                  cursor: "pointer",
                  marginTop: "auto",
                  padding: "2px",
                  border: "3px solid #6c6c6cd1",
                  borderStyle: "dotted",
                }}
              />
            ) : (
              <>
                <img
                  src={avatar}
                  width="50%"
                  style={{
                    cursor: "pointer",
                    marginTop: "auto",
                    border: "3px solid #6c6c6cd1",
                    borderStyle: "dotted",
                  }}
                />
              </>
            )}
          </label>
          <Label for="file">Choose A Product Picture</Label>
          <input
            type="file"
            id="upload-button"
            style={{ display: "none" }}
            onChange={onProfileSelect}
          />
        </div>

        {userProfile && userProfile ? (
          <Alert color="danger">{userProfile}</Alert>
        ) : null}
        <Form
          className="form-horizontal floating-form my-account"
          onSubmit={e => {
            e.preventDefault()
            validation.handleSubmit()
            return false
          }}
        >
          <Row className="g-4">
            <Col lg={12}>
              <FormGroup floating>
                <Input
                  type="number"
                  id="price"
                  name="price"
                  className="fw-bold"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.price || ""}
                  invalid={
                    validation.touched.price && validation.errors.price
                      ? true
                      : false
                  }
                  style={{
                    border: `${
                      validation.touched.price && validation.errors.price
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                  }}
                  placeholder="Customer Name"
                />
                <Label
                  for="price"
                  style={{
                    color: `${
                      validation.touched.price && validation.errors.price
                        ? "#ff6666"
                        : ""
                    }`,
                  }}
                >
                  Product Price
                </Label>
                {validation.touched.price && validation.errors.price ? (
                  <FormFeedback type="invalid">
                    {validation.errors.price}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Col lg={6}>
              <FormGroup floating>
                <Input
                  type="number"
                  id="quantity"
                  name="quantity"
                  className="fw-bold"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.quantity || ""}
                  invalid={
                    validation.touched.quantity && validation.errors.quantity
                      ? true
                      : false
                  }
                  style={{
                    border: `${
                      validation.touched.quantity && validation.errors.quantity
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                  }}
                  placeholder="Discription"
                />
                <Label
                  for="quantity"
                  style={{
                    color: `${
                      validation.touched.quantity && validation.errors.quantity
                        ? "#ff6666"
                        : ""
                    }`,
                  }}
                >
                  Product Quantity
                </Label>
                {validation.touched.quantity && validation.errors.quantity ? (
                  <FormFeedback type="invalid">
                    {validation.errors.quantity}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Col lg={6}>
              <FormGroup floating>
                <Input
                  type="number"
                  id="available"
                  name="available"
                  className="fw-bold"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.available || ""}
                  invalid={
                    validation.touched.available && validation.errors.available
                      ? true
                      : false
                  }
                  style={{
                    border: `${
                      validation.touched.available &&
                      validation.errors.available
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                  }}
                  placeholder="Discription"
                />
                <Label
                  for="available"
                  style={{
                    color: `${
                      validation.touched.available &&
                      validation.errors.available
                        ? "#ff6666"
                        : ""
                    }`,
                  }}
                >
                  Product Available
                </Label>
                {validation.touched.available && validation.errors.available ? (
                  <FormFeedback type="invalid">
                    {validation.errors.available}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Col lg={6}>
              <FormGroup floating>
                <Input
                  type="number"
                  id="sku"
                  name="sku"
                  className="fw-bold"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.sku || ""}
                  invalid={
                    validation.touched.sku && validation.errors.sku
                      ? true
                      : false
                  }
                  style={{
                    border: `${
                      validation.touched.sku && validation.errors.sku
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                  }}
                  placeholder="Discription"
                />
                <Label
                  for="sku"
                  style={{
                    color: `${
                      validation.touched.sku && validation.errors.sku
                        ? "#ff6666"
                        : ""
                    }`,
                  }}
                >
                  Product SKU
                </Label>
                {validation.touched.sku && validation.errors.sku ? (
                  <FormFeedback type="invalid">
                    {validation.errors.sku}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Col lg={6}>
              <FormGroup floating>
                <Input
                  type="number"
                  id="barcode"
                  name="barcode"
                  className="fw-bold"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.barcode || ""}
                  invalid={
                    validation.touched.barcode && validation.errors.barcode
                      ? true
                      : false
                  }
                  style={{
                    border: `${
                      validation.touched.barcode && validation.errors.barcode
                        ? "solid 1px #ff6666"
                        : ""
                    }`,
                  }}
                  placeholder="Discription"
                />
                <Label
                  for="barcode"
                  style={{
                    color: `${
                      validation.touched.barcode && validation.errors.barcode
                        ? "#ff6666"
                        : ""
                    }`,
                  }}
                >
                  Product Barcode
                </Label>
                {validation.touched.barcode && validation.errors.barcode ? (
                  <FormFeedback type="invalid">
                    {validation.errors.barcode}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Row>
              <Col>
                <div className="text-center mt-3">
                  <button type="submit" className="btn bg-success btn-lg ms-2">
                    {"Update File"}
                  </button>
                  <button
                    type="button"
                    className="btn bg-danger btn-lg ms-2"
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

ProducrListModel.propTypes = {
  onCloseClick: PropTypes.func,
  data: PropTypes.any,
  show: PropTypes.any,
}
export default ProducrListModel
