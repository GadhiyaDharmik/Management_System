import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { isEmpty } from "lodash"
import "bootstrap/dist/css/bootstrap.min.css"
import TableContainer from "../../components/Common/TableContainerCopy"
import * as Yup from "yup"
import { useFormik } from "formik"
import filter from "../../assets/images/filter.svg"
import date from "../../assets/images/calender.svg"

//import components

import {
  getCustomers as onGetCustomers,
  addNewCustomer as onAddNewCustomer,
  updateCustomer as onUpdateCustomer,
  deleteCustomer as onDeleteCustomer,
  getInvoicesList as onGetInvoicesList,
  changePreloader,
} from "../../store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

import { ServerIcon1 } from "../../components/Common/CommonSvg"
import { ServerIcon3 } from "../../components/Common/CommonSvg"
import { ServerIcon4 } from "../../components/Common/CommonSvg"
import { ServerIcon2 } from "../../components/Common/CommonSvg"

//Leave Modals
import { ModulePermissionList } from "./permissionModal"
//DeleteModal
import DeleteModal from "../../components/Common/DeleteModal"

import leave from "../../assets/images/eye-key-look-password-security-see-svgrepo-com.svg"

import eye from "../../assets/images/eye.svg"

import { Col, Row, Label, Badge } from "reactstrap"
const modules_temp = [
  {
    id: 1,
    moduleName: "Employee",
    slug: "employee",
    permissions: [
      {
        id: 1,
        slug: "employee_add",
        permissionName: "Add Employee",
      },
      {
        id: 2,
        slug: "employee_edit",
        permissionName: "Edit Employee",
      },
      {
        id: 3,
        slug: "employee_delete",
        permissionName: "Delete Employee",
      },
      {
        id: 4,
        slug: "employee_list",
        permissionName: "List Employee",
      },
      {
        id: 5,
        slug: "employee_view",
        permissionName: "View Employee",
      },
    ],
  },
  {
    id: 2,
    moduleName: "Branch",
    slug: "branch",
    permissions: [
      {
        id: 1,
        slug: "branch_add",
        permissionName: "Add Branch",
      },
      {
        id: 2,
        slug: "branch_edit",
        permissionName: "Edit Branch",
      },
      {
        id: 3,
        slug: "branch_delete",
        permissionName: "Delete Branch",
      },
      {
        id: 4,
        slug: "branch_list",
        permissionName: "List Branch",
      },
      {
        id: 5,
        slug: "branch_view",
        permissionName: "View Branch",
      },
    ],
  },
  {
    id: 3,
    moduleName: "Department",
    slug: "department",
    permissions: [
      {
        id: 1,
        slug: "department_add",
        permissionName: "Add Department",
      },
      {
        id: 2,
        slug: "department_edit",
        permissionName: "Edit Department",
      },
      {
        id: 3,
        slug: "department_delete",
        permissionName: "Delete Department",
      },
      {
        id: 4,
        slug: "department_list",
        permissionName: "List Department",
      },
      {
        id: 5,
        slug: "department_view",
        permissionName: "View Department",
      },
    ],
  },
  {
    id: 4,
    moduleName: "Attendance",
    slug: "attendance",
    permissions: [
      {
        id: 1,
        slug: "attendance_edit",
        permissionName: "Edit Attendance",
      },
      {
        id: 2,
        slug: "attendance_delete",
        permissionName: "Delete Attendance",
      },
      {
        id: 3,
        slug: "attendance_list",
        permissionName: "List Attendance",
      },
    ],
  },
  {
    id: 5,
    moduleName: "Holiday",
    slug: "holiday",
    permissions: [
      {
        id: 1,
        slug: "holiday_add",
        permissionName: "Add Holiday",
      },
      {
        id: 2,
        slug: "holiday_edit",
        permissionName: "Edit Holiday",
      },
      {
        id: 3,
        slug: "holiday_delete",
        permissionName: "Delete Holiday",
      },
      {
        id: 4,
        slug: "holiday_list",
        permissionName: "List Holiday",
      },
      {
        id: 5,
        slug: "holiday_view",
        permissionName: "View Holiday",
      },
    ],
  },
  {
    id: 6,
    moduleName: "Leave",
    slug: "leave",
    permissions: [
      {
        id: 1,
        slug: "leave_add",
        permissionName: "Add Leave",
      },
      {
        id: 2,
        slug: "leave_edit",
        permissionName: "Edit Leave",
      },
      {
        id: 3,
        slug: "leave_delete",
        permissionName: "Delete Leave",
      },
      {
        id: 4,
        slug: "leave_list",
        permissionName: "List Leave",
      },
      {
        id: 5,
        slug: "leave_view",
        permissionName: "View Leave",
      },
    ],
  },
]

function ModulesList({ id }) {
  const [modal, setModal] = useState(false)

  // const [leaveData, setLeaveData] = useState(data)

  const [openModal, setOpenModal] = useState(false)
  const [modulePermissions, setModulePermissions] = useState([])

  const openPermissions = cell => {
    // console.log(cell.row.original.permissions)

    setModulePermissions(cell.row.original.permissions)
  }

  const columns = useMemo(
    () => [
      {
        Header: " ID",
        accessor: "id",
        filterable: true,
        Cell: cellProps => {
          return <ModulesPermissionList {...cellProps} />
        },
      },
      {
        Header: "Module Name",
        accessor: "moduleName",
        filterable: true,
        Cell: cellProps => {
          return (
            <div>
              <span className="fw-bold fs-5 text-capitalize">
                {cellProps.row.original.moduleName}
              </span>
            </div>
          )
        },
      },
    ],
    []
  )
  return (
    <React.Fragment>
      <div className="page-content dashboard">
        <div className="container-fluid">
          <Row>
            <Col xs="12">
              <div className="table_v1">
                <TableContainer
                  tableClassName="product-table table-shadow"
                  columns={columns}
                  data={modules_temp}
                  isGlobalFilter={true}
                  isAddCustomer={true}
                  isAddTableBorderStrap={true}
                  //   handleCustomerClicks={handleCustomerClicks}
                  getTablePropsC={() => ({
                    className: "product-table",
                  })}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}
ModulesList.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default ModulesList


const ModulesPermissionList = cell => {
  const [open, setOpen] = useState(false)

  const handleEmployee = () => {
    setOpen(true)
  }
  return (
    <div className="d-flex align-items-center border-transparent notification_message text-color-v1">
      <Row>
        <Col>
          <img
            src={leave}
            alt=""
            onClick={handleEmployee}
            style={{ cursor: "pointer" }}
          />
        </Col>
      </Row>
      <ModulePermissionList
        show={open}
        permissions={cell.row.original}
        onCloseClick={() => setOpen(false)}
      />
    </div>
  )
}