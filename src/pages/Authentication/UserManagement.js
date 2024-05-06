import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  CardTitle,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap"

import Select from "react-select"

// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"

//redux
import { useSelector, useDispatch } from "react-redux"

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"

import avatar from "../../assets/images/users/avatar-4.jpg"
// actions
import { editProfile, resetProfileFlag } from "../../store/actions"
import { Link } from "react-router-dom"

import FloatingLabel from "react-bootstrap-floating-label"

import time from "../../assets/images/time.svg"
import { select } from "redux-saga/effects"

const optionGroup = [
  { label: "Admin", value: "Admin" },
  { label: "Hr", value: "Hr" },
  { label: "Employee", value: "Employee" },
]
const customStyles = {
  control: base => ({
    ...base,
    height: 50,
    minHeight: 50,
  }),
}
const UserManagement = props => {
  const dispatch = useDispatch()

  const [email, setemail] = useState("")
  const [name, setname] = useState("")
  const [idx, setidx] = useState("")

  const { error, success } = useSelector(state => ({
    error: state.Profile.error,
    success: state.Profile.success,
  }))
  //************************************************************************ */
  const [selectedRole, setSelecetedRole] = useState(null)
  const [modules, setModules] = useState(modules_temp)
  const [modulePermissions, setModulePermissions] = useState([])

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      roles: selectedRole || "",
      modules: modules || "",
      performance: modulePermissions || "",
    },
    // validationSchema: Yup.object({
    //   username: Yup.string().required("Please Enter Your UserName"),
    // }),
    onSubmit: values => {
      // dispatch(editProfile(values))
    },
  })

  function selectedRolePermissionForAll(e, list) {
    let permission = [...modulePermissions]
    if (!e) {
      list.map(item => {
        if (modulePermissions.includes(item.slug)) {
          permission = permission.filter(i => i !== item.slug)
        }
      })
    } else {
      list.map(item => {
        if (!modulePermissions.includes(item.slug)) {
          permission.push(item.slug)
        }
      })
    }
    setModulePermissions(permission)
  }

  function selectedRolePermission(e, slug) {
    let permission = [...modulePermissions]
    if (e) {
      permission.push(slug)
    } else {
      permission = permission.filter(item => item !== slug)
    }
    setModulePermissions(permission)
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Minible" breadcrumbItem="Role Management" />

          <Row>
            <Col lg="12">
              {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null}
              <Form
                className="form-horizontal user-management"
                onSubmit={e => {
                  e.preventDefault()
                  validation.handleSubmit()
                  return false
                }}
              >
                <Card className="m-0">
                  <CardBody>
                    <div className="inner-content invite-user">
                      <Row>
                        <Col md={4}>
                          <div className="form-group select-v1">
                            <label>Select Role</label>
                            <Select
                              name="selectRole"
                              classNamePrefix="select-v1"
                              options={optionGroup}
                              onChange={e => {
                                setSelecetedRole(e.value)
                              }}
                              styles={customStyles}
                              placeholder="Select Role"
                            />
                          </div>
                        </Col>
                      </Row>
                      <div className="mt-4">
                        <Row className="row-cols-xxl-6 row-cols-xl-3 row-cols-md-3 row-cols-sm-2 row-cols-1">
                          {modules &&
                            modules.map((module, index) => (
                              <Col key={index}>
                                <Card
                                  className="border border-2 shadow-none mt-3"
                                  key={index}
                                >
                                  <CardBody>
                                    <CardTitle className="border-bottom border-1 pb-3">
                                      <div className="">
                                        <div>
                                          <h6 className="font-size-16 text-dark mb-0">
                                            {" "}
                                            {module.name}
                                          </h6>
                                        </div>
                                        <div className="my-3 mb-0">
                                          <div className="form-check form-checkbox form-checkbox-lg check-group">
                                            <Input
                                              type="checkbox"
                                              id={module.name}
                                              name={module.name}
                                              className="form-check-input"
                                              defaultChecked={
                                                modulePermissions &&
                                                modulePermissions.length
                                                  ? module.methods.every(i =>
                                                      modulePermissions.includes(
                                                        i.slug
                                                      )
                                                    )
                                                  : false
                                              }
                                              onClick={() =>
                                                selectedRolePermissionForAll(
                                                  !module.methods.every(i =>
                                                    modulePermissions.includes(
                                                      i.slug
                                                    )
                                                  ),
                                                  module.methods
                                                )
                                              }
                                            />
                                            <Label
                                              htmlFor={module.name}
                                              className="mb-0 font-size-15 text-muted"
                                            >
                                              Select All
                                            </Label>
                                          </div>
                                        </div>
                                      </div>
                                    </CardTitle>
                                    <div className="mt-3">
                                      <Row className="row-cols-1">
                                        {module.methods &&
                                          module.methods.map(
                                            (method, index) => (
                                              <Col className="py-1" key={index}>
                                                <div className="form-check ps-sm-auto ps-0">
                                                  <div className="form-check form-checkbox form-checkbox-lg check-group">
                                                    <Input
                                                      type="checkbox"
                                                      className="form-check-input"
                                                      name={method.slug}
                                                      id={method.slug}
                                                      checked={
                                                        modulePermissions &&
                                                        modulePermissions.includes(
                                                          method.slug
                                                        )
                                                      }
                                                      onClick={() =>
                                                        selectedRolePermission(
                                                          !modulePermissions.includes(
                                                            method.slug
                                                          ),
                                                          method.slug
                                                        )
                                                      }
                                                    />
                                                    <Label
                                                      className="mb-0"
                                                      htmlFor={method.slug}
                                                    >
                                                      {method.name}
                                                    </Label>
                                                  </div>
                                                </div>
                                              </Col>
                                            )
                                          )}
                                      </Row>
                                    </div>
                                  </CardBody>
                                </Card>
                              </Col>
                            ))}
                        </Row>
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <div className="btn-group mt-30">
                  <button
                    className="btn btn-primary w-100 waves-effect waves-light btn-save font-normal btnv1"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default UserManagement 

const modules_temp = [
  {
    id: 1,
    name: "Employee",
    methods: [
      {
        id: 1,
        slug: "employee_add",
        name: "Add",
      },
      {
        id: 2,
        slug: "employee_edit",
        name: "Edit",
      },
      {
        id: 3,
        slug: "employee_delete",
        name: "Delete",
      },
      {
        id: 4,
        slug: "employee_list",
        name: "List",
      },
      {
        id: 5,
        slug: "employee_view",
        name: "View",
      },
    ],
  },
  {
    id: 2,
    name: "Branch",
    methods: [
      {
        id: 1,
        slug: "branch_add",
        name: "Add",
      },
      {
        id: 2,
        slug: "branch_edit",
        name: "Edit",
      },
      {
        id: 3,
        slug: "branch_delete",
        name: "Delete",
      },
      {
        id: 4,
        slug: "branch_list",
        name: "List",
      },
      {
        id: 5,
        slug: "branch_view",
        name: "View",
      },
    ],
  },
  {
    id: 3,
    name: "Department",
    methods: [
      {
        id: 1,
        slug: "department_add",
        name: "Add",
      },
      {
        id: 2,
        slug: "department_edit",
        name: "Edit",
      },
      {
        id: 3,
        slug: "department_delete",
        name: "Delete",
      },
      {
        id: 4,
        slug: "department_list",
        name: "List",
      },
      {
        id: 5,
        slug: "department_view",
        name: "View",
      },
    ],
  },
  {
    id: 4,
    name: "Attendance",
    methods: [
      {
        id: 1,
        slug: "attendance_add",
        name: "Add",
      },
      {
        id: 2,
        slug: "attendance_edit",
        name: "Edit",
      },
      {
        id: 3,
        slug: "attendance_delete",
        name: "Delete",
      },
      {
        id: 4,
        slug: "attendance_list",
        name: "List",
      },
      {
        id: 5,
        slug: "attendance_view",
        name: "View",
      },
    ],
  },
  {
    id: 5,
    name: "Holiday",
    methods: [
      {
        id: 1,
        slug: "holiday_add",
        name: "Add",
      },
      {
        id: 2,
        slug: "holiday_edit",
        name: "Edit",
      },
      {
        id: 3,
        slug: "holiday_delete",
        name: "Delete",
      },
      {
        id: 4,
        slug: "holiday_list",
        name: "List",
      },
      {
        id: 5,
        slug: "holiday_view",
        name: "View",
      },
    ],
  },
  {
    id: 6,
    name: "Leave",
    methods: [
      {
        id: 1,
        slug: "leave_add",
        name: "Add",
      },
      {
        id: 2,
        slug: "leave_edit",
        name: "Edit",
      },
      {
        id: 3,
        slug: "leave_delete",
        name: "Delete",
      },
      {
        id: 4,
        slug: "leave_list",
        name: "List",
      },
      {
        id: 5,
        slug: "leave_view",
        name: "View",
      },
    ],
  },
]
