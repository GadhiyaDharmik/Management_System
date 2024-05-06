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

// Formik Validation
import * as Yup from "yup"
import { Formik, useFormik, FieldArray } from "formik"

const CityModal = ({ show, onCloseClick, data, id }) => {
    // console.log("data", data)
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: '',
        },
        validationSchema: Yup.object({
            name: Yup.string("Enter a Compny Name").required(
                "Please Enter a   Name"
            ),
           
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values)
            resetForm()
            onCloseClick()
        },
    })
    const handleClose = () => {
        validation.resetForm()
        onCloseClick()
    }
    return (
        <Modal isOpen={show} toggle={onCloseClick} data={data} centered={true}>
            <ModalHeader> CIty</ModalHeader>
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
                        <Col lg="12">
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
                                    City Name
                                </Label>
                                {validation.touched.name && validation.errors.name ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.name}
                                    </FormFeedback>
                                ) : null}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="text-center mt-3">
                                <button type="submit" className="btn btn-success btn-lg ms-2">
                                {id ? "Update City" : "Add City"}
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
export default CityModal
