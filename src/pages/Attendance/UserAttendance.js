import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import "bootstrap/dist/css/bootstrap.min.css"
import TableContainer from "../../components/Common/TableContainerCopy"

import { Col, Row, Form, Modal, ModalBody, Badge } from "reactstrap"

import del from "../../assets/images/table-delete.svg"
import edit from "../../assets/images/table-edit.svg"

import {
  AttendanceModal,
  AttendanceChackInModal,
  AttendanceChackOutModal,
  ChangeAttendanceStatus,
} from "./AttendanceModel"

import DeleteModal from "../../components/Common/DeleteModal"

function UserAttendance({ id, selectedMonth }) {
  const [openModal, setOpenModal] = useState(false)
  const [attendanceList, setAttendanceList] = useState(data)

  const columns = useMemo(() => [
    {
      Header: "ID",
      accessor: "employee_Id",
      filterable: false,
      disableSortBy: true,
    },

    {
      Header: "Employe Name",
      accessor: "employe_Name",
      filterable: true,
      Cell: cellProps => {
        return (
          <div>
            <span className="fw-bold text-capitalize">
              {cellProps.row.original.employe_Name}
            </span>
          </div>
        )
      },
    },
    {
      Header: "Date",
      accessor: "date",
      filterable: true,
    },
    {
      Header: "Check In",
      accessor: "checkIn",
      filterable: true,
      Cell: cellProps => {
        return <ActionCheckIn {...cellProps} />
      },
    },
    {
      Header: "Check Out",
      accessor: "checkOut",
      filterable: true,
      Cell: cellProps => {
        return <ActionCheckOut {...cellProps} />
      },
    },
    {
      Header: "Total Hours",
      accessor: "totalHours",
      filterable: true,
      Cell: cellProps => {
        const convertTime12to24 = time12h => {
          const [time, modifier] = time12h.split(" ")

          let [hours, minutes] = time.split(":")

          if (hours === "12") {
            hours = "00"
          }

          if (modifier === "PM") {
            hours = parseInt(hours, 10) + 12
          }

          return `${hours}:${minutes}`
        }
        const checkInTime = new Date(
          `${cellProps.row.original.date}T${convertTime12to24(
            cellProps.row.original.checkIn
          )}`
        )
        const checkOutTime = new Date(
          `${cellProps.row.original.date}T${convertTime12to24(
            cellProps.row.original.checkOut
          )}`
        )
        const diffInMs = checkOutTime - checkInTime
        const totalHours = diffInMs / 60000
        return (
          <>
            <div>{totalHours / 60} Hours</div>
          </>
        )
      },
    },
    {
      Header: " Employe Status",
      accessor: "EmployeeStatus",
      filterable: true,
      Cell: cellProps => {
        return <AttendanceStatus {...cellProps} />
      },
    },
    {
      Header: "Action",
      accessor: "action",
      disableSortBy: true,
      filterable: true,
      Cell: cellProps => {
        return <AttendanceActions {...cellProps} />
      },
    },
  ])

  React.useEffect(() => {
    if (selectedMonth) {
      setAttendanceList(
        [...data].filter(
          item => parseInt(item.date.substring(5, 7)) == selectedMonth
        )
      )
    }
  }, [selectedMonth])

  return (
    <React.Fragment>
      <div className="tab-pane fade show active">
        <div className="tab_content tab-data-table">
          <div className="table_v1">
            <TableContainer
              tableClassName="product-table table-shadow"
              columns={columns}
              data={
                id ? data.filter(ele => ele.employee_Id == id) : attendanceList
              }
              isGlobalFilter={true}
              isAddCustomer={true}
              isAddTableBorderStrap={true}
              //   handleCustomerClicks={handleCustomerClicks}
              getTablePropsC={() => ({
                className: "product-table",
              })}
            />
          </div>
        </div>
      </div>

      <AttendanceModal
        show={openModal}
        onCloseClick={() => setOpenModal(false)}
      />
    </React.Fragment>
  )
}
UserAttendance.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default UserAttendance

const AttendanceStatus = cell => {
  const [openStatusModal, setOpenStatusModal] = React.useState(false)
  const handleAttendanceStatus = () => {
    setOpenStatusModal(true)
  }
  return (
    <div className="d-flex">
      <div className="status_block">
        <Badge
          className={
            "badge badge-pill bg-pill font-size-12 bg-soft-" +
            (cell.row.original.EmployeeStatus === "Approved"
              ? "success"
              : ("danger" && cell.row.original.EmployeeStatus === "pending") ||
                "Rejected"
              ? "danger"
              : "")
          }
          style={{ cursor: "pointer" }}
          onClick={() => handleAttendanceStatus()}
        >
          {cell.row.original.EmployeeStatus}
        </Badge>
      </div>
      <ChangeAttendanceStatus
        show={openStatusModal}
        onCloseClick={() => setOpenStatusModal(false)}
      />
    </div>
  )
}

const data = [
  {
    employee_Id: "1",
    employe_Name: "Sahil sagapariya",
    date: "2023-01-03",
    checkIn: "10:00 AM",
    totalHours: "",
    checkOut: "9:30 PM",
    EmployeeStatus: "Approved",
  },
  {
    employee_Id: "1",
    employe_Name: "Sahil sagapariya",
    date: "2023-01-03",
    checkIn: "10:00 AM",
    totalHours: "",

    checkOut: "9:30 PM",
    EmployeeStatus: "Approved",
  },
  {
    employee_Id: "1",
    employe_Name: "Sahil sagapariya",
    date: "2023-01-03",
    totalHours: "",

    checkIn: "10:00 AM",

    checkOut: "9:30 PM",
    EmployeeStatus: "Approved",
  },
  {
    employee_Id: "1",
    employe_Name: "Sahil sagapariya",
    date: "2023-01-03",
    totalHours: "",

    checkIn: "10:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Approved",
  },
  {
    employee_Id: "1",
    employe_Name: "Sahil sagapariya",
    date: "2023-02-03",
    totalHours: "",

    checkIn: "10:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Approved",
  },
  {
    employee_Id: "1",
    employe_Name: "Sahil sagapariya",
    date: "2023-02-04",
    totalHours: "",

    checkIn: "10:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Approved",
  },
  {
    employee_Id: "1",
    employe_Name: "Sahil sagapariya",
    date: "2023-02-05",
    totalHours: "",

    totalHours: "",

    checkIn: "10:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Approved",
  },
  {
    employee_Id: "1",
    employe_Name: "Sahil sagapariya",
    date: "2023-02-06",
    totalHours: "",

    checkIn: "10:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Approved",
  },
  {
    employee_Id: "2",
    employe_Name: "bhavil sagaapriya",
    date: "2023-02-07",
    totalHours: "",

    checkIn: "10:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Approved",
  },
  {
    employee_Id: "3",
    employe_Name: "dharmik gadhiya",
    date: "2023-03-03",
    totalHours: "",

    checkIn: "10:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Pending",
  },
  {
    employee_Id: "3",
    employe_Name: "dharmik gadhiya",
    date: "2023-03-04",
    totalHours: "",

    checkIn: "10:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Pending",
  },
  {
    employee_Id: "3",
    employe_Name: "dharmik gadhiya",
    date: "2023-03-05",
    totalHours: "",

    checkIn: "10:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Pending",
  },
  {
    employee_Id: "3",
    employe_Name: "dharmik gadhiya",
    date: "2023-03-06",
    totalHours: "",

    checkIn: "10:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Pending",
  },
  {
    employee_Id: "3",
    employe_Name: "dharmik gadhiya",
    date: "2023-03-07",
    totalHours: "",

    checkIn: "10:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Pending",
  },
  {
    employee_Id: "3",
    employe_Name: "dharmik gadhiya",
    date: "2023-04-01",
    totalHours: "",

    checkIn: "10:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Pending",
  },
  {
    employee_Id: "4",
    employe_Name: "Krunal lunagriya",
    date: "2023-04-03",
    totalHours: "",

    checkIn: "11:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Approved",
  },
  {
    employee_Id: "5",
    employe_Name: "bhsvil sagapariya",
    date: "2023-04-03",
    totalHours: "",

    checkIn: "01:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Rejected",
  },
  {
    employee_Id: "6",
    employe_Name: "chirag kothiya",
    date: "2023-12-03",
    totalHours: "",

    checkIn: "09:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Pending",
  },
]
const AttendanceActions = cell => {
  const [openAttendanceEdit, setOpenAttendanceEdit] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  //Edit
  const handleEditEmployeeAttendance = () => {
    console.log(cell.row.original)
    setOpenAttendanceEdit(true)
  }
  //Delete Model
  const handleDeleteEmployee = () => {
    console.log(cell.row.original.employee_Id)
    setDeleteModal(false)
  }

  return (
    <div className="d-flex align-items-center border-transparent notification_message text-color-v1">
      <Row>
        <Col lg={4}>
          <button
            className="btn btn-transparent"
            onClick={handleEditEmployeeAttendance}
          >
            <img src={edit} alt="" />
          </button>
        </Col>
        <Col lg={8}>
          <button
            className="btn btn-transparent"
            onClick={() => setDeleteModal(true)}
          >
            <img src={del} alt="" />
          </button>
        </Col>
      </Row>

      <AttendanceModal
        id={cell.row.original.employee_Id}
        show={openAttendanceEdit}
        onCloseClick={() => setOpenAttendanceEdit(false)}
      />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteEmployee}
        onCloseClick={() => setDeleteModal(false)}
      />
    </div>
  )
}

const ActionCheckIn = cell => {
  const [openAttendanceEdit, setOpenAttendanceEdit] = useState(false)

  //Edit
  const handleEditEmployee = () => {
    console.log(cell.row.original)
    setOpenEditModal(true)
  }
  //Delete Model
  const handleAttendanceEdit = () => {
    console.log(cell.row.original.id)
    setOpenAttendanceEdit(true)
  }

  return (
    <div className="d-flex align-items-center border-transparent notification_message text-color-v1">
      <Badge
        className="badge badge-pill bg-pill font-size-12 bg-soft-success"
        style={{ cursor: "pointer" }}
        onClick={handleAttendanceEdit}
      >
        {cell.row.original.checkIn}
      </Badge>
      <AttendanceChackInModal
        show={openAttendanceEdit}
        onCloseClick={() => setOpenAttendanceEdit(false)}
      />
    </div>
  )
}
const ActionCheckOut = cell => {
  const [openAttendanceEdit, setOpenAttendanceEdit] = useState(false)
  //CheckIn Model
  const handleAttendanceEdit = () => {
    console.log(cell.row.original.id)
    setOpenAttendanceEdit(true)
  }

  return (
    <div className="d-flex align-items-center border-transparent notification_message text-color-v1">
      <Badge
        className="badge badge-pill bg-pill font-size-12 bg-soft-success"
        style={{ cursor: "pointer" }}
        onClick={handleAttendanceEdit}
      >
        {cell.row.original.checkOut}
      </Badge>
      <AttendanceChackOutModal
        show={openAttendanceEdit}
        onCloseClick={() => setOpenAttendanceEdit(false)}
      />
    </div>
  )
}
