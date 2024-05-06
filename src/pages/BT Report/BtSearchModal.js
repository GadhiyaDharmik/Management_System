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
    FormFeedback,
    ModalHeader,
    Button,
} from "reactstrap"

// Formik Validation
import * as Yup from "yup"
import { useFormik, FormikProvider, FieldArray } from "formik";

const BranchModal = ({ show, onCloseClick, data, id }) => {
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: '',
            Fees: '',
            email1:'',
            email2:'',
            email3:'',
            email4:'',
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
                                        validation.touched.Fees &&
                                            validation.errors.Fees
                                            ? true
                                            : false
                                    }
                                    style={{
                                        border: `${validation.touched.Fees &&
                                            validation.errors.Fees
                                            ? "solid 1px #ff6666"
                                            : ""
                                            }`,
                                    }}
                                    placeholder="User Name"
                                />
                                <Label
                                    for="Fees"
                                    style={{
                                        color: `${validation.touched.Fees &&
                                            validation.errors.Fees
                                            ? "#ff6666"
                                            : ""
                                            }`,
                                    }}
                                >
                                    Fees
                                </Label>
                                {validation.touched.Fees &&
                                    validation.errors.Fees ? (
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
                                        validation.touched.email1 &&
                                            validation.errors.email1
                                            ? true
                                            : false
                                    }
                                    style={{
                                        border: `${validation.touched.email1 &&
                                            validation.errors.email1
                                            ? "solid 1px #ff6666"
                                            : ""
                                            }`,
                                    }}
                                    placeholder="User Name"
                                />
                                <Label
                                    for="email1"
                                    style={{
                                        color: `${validation.touched.email1 &&
                                            validation.errors.email1
                                            ? "#ff6666"
                                            : ""
                                            }`,
                                    }}
                                >
                                    email1
                                </Label>
                                {validation.touched.email1 &&
                                    validation.errors.email1 ? (
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
                                        validation.touched.email2 &&
                                            validation.errors.email2
                                            ? true
                                            : false
                                    }
                                    style={{
                                        border: `${validation.touched.email2 &&
                                            validation.errors.email2
                                            ? "solid 1px #ff6666"
                                            : ""
                                            }`,
                                    }}
                                    placeholder="User Name"
                                />
                                <Label
                                    for="email2"
                                    style={{
                                        color: `${validation.touched.email2 &&
                                            validation.errors.email2
                                            ? "#ff6666"
                                            : ""
                                            }`,
                                    }}
                                >
                                    email2
                                </Label>
                                {validation.touched.email2 &&
                                    validation.errors.email2 ? (
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
                                        validation.touched.email3 &&
                                            validation.errors.email3
                                            ? true
                                            : false
                                    }
                                    style={{
                                        border: `${validation.touched.email3 &&
                                            validation.errors.email3
                                            ? "solid 1px #ff6666"
                                            : ""
                                            }`,
                                    }}
                                    placeholder="User Name"
                                />
                                <Label
                                    for="email3"
                                    style={{
                                        color: `${validation.touched.email3 &&
                                            validation.errors.email3
                                            ? "#ff6666"
                                            : ""
                                            }`,
                                    }}
                                >
                                    email3
                                </Label>
                                {validation.touched.email3 &&
                                    validation.errors.email3 ? (
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
                                        validation.touched.email4 &&
                                            validation.errors.email4
                                            ? true
                                            : false
                                    }
                                    style={{
                                        border: `${validation.touched.email4 &&
                                            validation.errors.email4
                                            ? "solid 1px #ff6666"
                                            : ""
                                            }`,
                                    }}
                                    placeholder="User Name"
                                />
                                <Label
                                    for="email4"
                                    style={{
                                        color: `${validation.touched.email4 &&
                                            validation.errors.email4
                                            ? "#ff6666"
                                            : ""
                                            }`,
                                    }}
                                >
                                    email4
                                </Label>
                                {validation.touched.email4 &&
                                    validation.errors.email4 ? (
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
