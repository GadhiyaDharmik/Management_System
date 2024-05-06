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

//redux
import { useSelector, useDispatch } from "react-redux"

import { ServerIcon1 } from "../../components/Common/CommonSvg"
import { ServerIcon3 } from "../../components/Common/CommonSvg"
import { ServerIcon4 } from "../../components/Common/CommonSvg"
import { ServerIcon2 } from "../../components/Common/CommonSvg"

//Leave Modals
import {
  LeaveModal,
  LeaveFromModal,
  LeaveToModal,
  LeaveReasonModal,
  ChangeRequestStatus,
} from "./LeaveRequestsModal"
//DeleteModal
import DeleteModal from "../../components/Common/DeleteModal"

import leave from "../../assets/images/eye-key-look-password-security-see-svgrepo-com.svg"

import eye from "../../assets/images/eye.svg"
import del from "../../assets/images/table-delete.svg"
import edit from "../../assets/images/table-edit.svg"

import {
  WidTotalLeave,
  WidPanding,
  WidRejected,
  WidAprrovedLeave,
} from "../../components/Common/Widgets"

import { Col, Row, Label, Badge } from "reactstrap"
const data = [
  {
    employee_Id: "1",
    employe_Name: "Sahil sagapariya",
    date: "2023-03-03",
    leaveFrom: "2023-03-03",
    leaveTo: "2023-03-13",
    leaveStatus: "Approved",
  },
  {
    employee_Id: "2",
    employe_Name: "bhavil sagaapriya",
    date: "2023-03-03",
    leaveFrom: "2023-03-13",
    leaveTo: "2023-03-03",
    leaveStatus: "Approved",
  },
  {
    employee_Id: "3",
    employe_Name: "dharmik gadhiya",
    date: "2023-03-03",
    leaveFrom: "2023-03-03",
    leaveTo: "2023-03-21",
    leaveStatus: "Pending",
  },
  {
    employee_Id: "4",
    employe_Name: "Krunal lunagriya",
    date: "2023-03-03",
    leaveFrom: "2023-03-03",
    leaveTo: "2023-03-20",
    leaveStatus: "Approved",
  },
  {
    employee_Id: "5",
    employe_Name: "bhsvil sagapariya",
    date: "2023-03-03",
    leaveFrom: "2023-03-03",
    leaveTo: "2023-03-10",
    leaveStatus: "Pending",
  },
  {
    employee_Id: "6",
    employe_Name: "chirag kothiya",
    date: "2023-03-03",
    leaveFrom: "2023-03-02",
    leaveTo: "2023-04-02",
    leaveStatus: "Reject",
  },
  {
    employee_Id: "7",
    employe_Name: "chirag kothiya",
    date: "2023-03-03",
    leaveFrom: "2023-03-02",
    leaveTo: "2023-03-03",
    leaveStatus: "Reject",
  },
]

function LeaveRequestsList({ id }) {
  const [modal, setModal] = useState(false)

  const [leaveData, setLeaveData] = useState(data)

  const [openModal, setOpenModal] = useState(false)
  const [customer, setCustomer] = useState([])

  const dispatch = useDispatch()

  // const { invoicesList } = useSelector(state => ({
  //   invoicesList: state.invoices.invoicesList,
  // }))
  // console.log("invoice list", invoicesList)

  // useEffect(() => {
  //   let config = {
  //     params: {
  //       command: "whmcs_invoicelist",
  //       debug: 1,
  //     },
  //   }

  //   if (invoicesList && !invoicesList.length) {
  //     dispatch(onGetInvoicesList(config))
  //   }
  // }, [dispatch])

  const columns = useMemo(
    () => [
      {
        Header: " ID",
        accessor: "employee_Id",
        filterable: true,
      },
      {
        Header: "Employe Name",
        accessor: "employe_Name",
        filterable: true,
        Cell: cellProps => {
          return (
            <div>
              <span className="fw-bold fs-5 text-capitalize">
                {cellProps.row.original.employe_Name}
              </span>
            </div>
          )
        },
      },
      {
        Header: "Requested Date",
        accessor: "date",
        filterable: true,
        Cell: cellProps => {
          return (
            <div>
              <img src={date} className="mb-2" />
              <span className="fw-bold ps-2 ">
                {cellProps.row.original.date}
              </span>
            </div>
          )
        },
      },
      {
        Header: "Leave from",
        accessor: "leaveFrom",
        filterable: true,
        Cell: cellProps => {
          return <ActionLeaveFrom {...cellProps} />
        },
      },
      {
        Header: "Leave TO",
        accessor: "leaveTo",
        filterable: true,
        Cell: cellProps => {
          return <ActionLeaveTo {...cellProps} />
        },
      },
      {
        Header: "Reasone",
        accessor: "reasone",
        filterable: true,
        Cell: cellProps => {
          return <LeaveReason {...cellProps} />
        },
      },
      {
        Header: "Request Status",
        accessor: "leaveStatus",
        filterable: true,
        Cell: cellProps => {
          return <LeaveRequestsStatus {...cellProps} />
        },
      },
      {
        Header: "Action",
        accessor: "action",
        filterable: true,
        Cell: cellProps => {
          return <LeaveRequestsActions {...cellProps} />
        },
      },
    ],
    []
  )

  const handelLeaveSearch = event => {
    let value = event.target.value
    if (value != "") {
      setLeaveData(
        [...data].filter(ele =>
          ele.employe_Name.toLowerCase().includes(value.toLowerCase())
        )
      )
    } else {
      setLeaveData([...data].filter(ele => ele))
    }
  }

  return (
    <React.Fragment>
      <div className="page-content dashboard">
        <div className="container-fluid">
          <div className="server_info">
            <div className="row">
              <div
                className="col"
                onClick={() => {
                  setLeaveData([...data].filter(ele => ele))
                }}
              >
                <WidTotalLeave data={data}></WidTotalLeave>
              </div>
              <div
                className="col"
                onClick={() => {
                  setLeaveData(
                    [...data].filter(ele => ele.leaveStatus == "Pending")
                  )
                }}
              >
                <WidPanding data={data}></WidPanding>
              </div>
              <div
                className="col"
                onClick={() => {
                  setLeaveData(
                    [...data].filter(ele => ele.leaveStatus == "Approved")
                  )
                }}
              >
                <WidAprrovedLeave data={data}></WidAprrovedLeave>
              </div>
              <div
                className="col"
                onClick={() => {
                  setLeaveData(
                    [...data].filter(ele => ele.leaveStatus == "Reject")
                  )
                }}
              >
                <WidRejected data={data}></WidRejected>
              </div>
            </div>
          </div>
          <div className="tab_content p-0 bg-transparent manage-tab">
            <Row>
              <Col md="10">
                <form className="app-search d-lg-block p-0 search-v1">
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search Employee Detail"
                      onChange={e => {
                        handelLeaveSearch(e)
                      }}
                    />
                    <span className="uil-search"></span>
                  </div>
                </form>
              </Col>
              <Col md="2">
                <button
                  className="btn pb-3 pt-3 btn-invoice"
                  onClick={() => {
                    setOpenModal(true)
                  }}
                >
                  <div>
                    <i className="uil-plus"></i>
                  </div>
                  Add Leave
                </button>
              </Col>
            </Row>
          </div>
          <Row>
            <Col xs="12">
              <div className="table_v1">
                <TableContainer
                  tableClassName="product-table table-shadow"
                  columns={columns}
                  data={leaveData}
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

          <LeaveModal
            show={openModal}
            onCloseClick={() => setOpenModal(false)}
          />
        </div>
      </div>
    </React.Fragment>
  )
}
LeaveRequestsList.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default LeaveRequestsList

//Leave
const ActionLeaveFrom = cell => {
  const [openLeaveRequestsEdit, setOpenLeaveRequestsEdit] = useState(false)

  //Edit
  const handleEditEmployee = () => {
    console.log(cell.row.original.leaveFrom)
    setOpenEditModal(true)
  }
  //Delete Model
  const handleLeaveRequestsEdit = () => {
    console.log(cell.row.original.id)
    setOpenLeaveRequestsEdit(true)
  }

  return (
    <div className="d-flex align-items-center border-transparent notification_message text-color-v1">
      <Badge
        className="badge badge-pill bg-pill font-size-12 bg-soft-success"
        style={{ cursor: "pointer" }}
        onClick={handleLeaveRequestsEdit}
      >
        {cell.row.original.leaveFrom}
      </Badge>
      <LeaveFromModal
        show={openLeaveRequestsEdit}
        id={cell.row.original.id}
        onCloseClick={() => setOpenLeaveRequestsEdit(false)}
      />
    </div>
  )
}
const ActionLeaveTo = cell => {
  const [openLeaveRequestsEdit, setOpenLeaveRequestsEdit] = useState(false)
  //Edit Modal
  const handleLeaveRequestsEdit = () => {
    console.log(cell.row.original.id)
    setOpenLeaveRequestsEdit(true)
  }

  return (
    <div className="d-flex align-items-center border-transparent notification_message text-color-v1">
      <Badge
        className="badge badge-pill bg-pill font-size-12 bg-soft-success"
        style={{ cursor: "pointer" }}
        onClick={handleLeaveRequestsEdit}
      >
        {cell.row.original.leaveTo}
      </Badge>
      <LeaveToModal
        show={openLeaveRequestsEdit}
        id={cell.row.original.id}
        onCloseClick={() => setOpenLeaveRequestsEdit(false)}
      />
    </div>
  )
}
const LeaveRequestsStatus = cell => {
  const [openLeaveRequestsStatusEdit, setOpenLeaveRequestsStatusEdit] =
    useState(false)

  //Edit
  const handleEditEmployeeLeaveRequestsStatus = () => {
    console.log(cell.row.original)
    setOpenLeaveRequestsStatusEdit(true)
  }
  return (
    <div className="d-flex">
      <div className="status_block">
        <Badge
          className={
            "badge badge-pill bg-pill font-size-12 bg-soft-" +
            (cell.value === "Approved"
              ? "success"
              : ("danger" && cell.value === "Pending") || "Reject"
              ? "danger"
              : "")
          }
          style={{ cursor: "pointer" }}
          onClick={handleEditEmployeeLeaveRequestsStatus}
        >
          {cell.value}
        </Badge>{" "}
      </div>
      <ChangeRequestStatus
        show={openLeaveRequestsStatusEdit}
        id={cell.row.original.id}
        onCloseClick={() => setOpenLeaveRequestsStatusEdit(false)}
      />
    </div>
  )
}
const LeaveReason = cell => {
  const [openLeaveRequestsEdit, setOpenLeaveRequestsEdit] = useState(false)

  //Edit
  const handleEditEmployeeLeaveRequests = () => {
    console.log(cell.row.original)
    setOpenLeaveRequestsEdit(true)
  }
  return (
    <div className="d-flex align-items-center border-transparent notification_message text-color-v1">
      <Row>
        <Col>
          <img
            src={leave}
            alt=""
            onClick={handleEditEmployeeLeaveRequests}
            style={{ cursor: "pointer" }}
          />
        </Col>
      </Row>
      <LeaveReasonModal
        show={openLeaveRequestsEdit}
        id={cell.row.original.id}
        onCloseClick={() => setOpenLeaveRequestsEdit(false)}
      />
    </div>
  )
}
const LeaveRequestsActions = cell => {
  const [openLeaveRequestsEdit, setOpenLeaveRequestsEdit] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  //Edit
  const handleEditEmployeeLeaveRequests = () => {
    console.log(cell.row.original)
    setOpenLeaveRequestsEdit(true)
  }
  //Delete Model
  const handleDeleteEmployee = () => {
    console.log(cell.row.original.employee_Id)
    setDeleteModal(false)
  }

  return (
    <div className="d-flex align-items-center border-transparent notification_message text-color-v1">
      <Row>
        <Col>
          <button
            className="btn text-light"
            onClick={handleEditEmployeeLeaveRequests}
          >
            <img src={edit} alt="" />
          </button>
        </Col>
        <Col>
          <button
            className="btn text-light"
            onClick={() => setDeleteModal(true)}
          >
            <img src={del} alt="" />
          </button>
        </Col>
      </Row>
      <LeaveModal
        show={openLeaveRequestsEdit}
        id={cell.row.original.employee_Id}
        onCloseClick={() => setOpenLeaveRequestsEdit(false)}
      />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteEmployee}
        onCloseClick={() => setDeleteModal(false)}
      />
    </div>
  )
}
